window.addEventListener("load", () => {
	update()
	setInterval(update, 30000)
})

document.addEventListener("DOMContentLoaded", () => {
	loadBackButtons()
	loadThemePicker()
	try {
		let accent = localStorage.getItem("statusapp-accent")
		if (accent) selectAccent(accent, false)
		else selectAccent("red", false)
		let theme = localStorage.getItem("statusapp-light")
		if (theme) selectTheme(theme == "true", false)
		else selectTheme(false, false)
	}
	catch (e) {}
})

window.addEventListener("hashchange", (event) => {
	let hash = window.location.hash.slice(1)
	if (hash == "") hash = "main"
	goto(hash, false)
})

function loadBackButtons() {
	let buttons = getClasses("back")
	for (let button of buttons) {
		button.onclick = () => {
			goBack()
		}
	}
}

function goto(target, updateHash = true) {
	if (updateHash) window.location.hash = target
	let toShow = get(target)
	let screens = getClasses("screen")
	for (screen of screens) {
		if (toShow == screen) screen.classList.remove("hidden")
		else screen.classList.add("hidden")
	}
}

function goBack() {
	window.history.back()
}

function loadThemePicker() {
	let accents = getClasses("accents")[0].children
	for (let accent of accents) {
		accent.addEventListener("click", () => {
			selectAccent(accent.className)
		})
	}
}

function selectAccent(accent, save=true) {
	accent = accent.replace("selected", "").trim()
	let available = getClasses("accents")[0].children
	let cl = document.body.classList
	for (let color of available) {
		if (color.classList.contains(accent)) {
			color.classList.add("selected")
			cl.add(accent)
		}
		else {
			color.classList.remove("selected")
			cl.remove(color.className.replace("selected", ""))
		}
	}
	if (!save) return
	try {
		localStorage.setItem("statusapp-accent", accent)
	}
	catch (e) {
		console.warn("Cookies are disabled. Settings will not be saved.")
	}
}
function selectTheme(isLight, save=true) {
	let cl = document.body.classList
	let elems = getClasses("theme")
	if (isLight) cl.add("light")
	else cl.remove("light")
	elems[0 + isLight].classList.remove("selected")
	elems[1 - isLight].classList.add("selected")
	if (!save) return
	try {
		localStorage.setItem("statusapp-light", isLight)
	}
	catch (e) {
		console.warn("Cookies are disabled. Settings will not be saved.")
	}
}

function update() {
	if (document.hidden) return
	let xhr = new XMLHttpRequest()
	xhr.open("GET", "api/status")
	xhr.onload = function() {
		get("main").classList.remove("unloaded")
		console.log("API Response:", this.responseText)
		if (this.status === 200) {
			parseData(this)
		} else {
			console.error("API returned status:", this.status)
		}
	}
	xhr.onerror = function() {
		console.error("API request failed")
	}
	xhr.send()
}

let data_prev
function parseData(resp) {
	try {
		let data = JSON.parse(resp.responseText)
		console.log("Parsed data:", data)
		console.log("Netami TV data:", data["netami-tv"])
		console.log("Netami Games data:", data["netami-games"])
		console.log("Mod data:", data.mod)
		console.log("Vincent data:", data.vincent)
		
		if (!data_prev) data_prev = data
		updateDeviceName()
		updateNetamiTV(data["netami-tv"])
		updateNetamiGames(data["netami-games"])
		updateMod(data.mod)
		updateVincent(data.vincent)
		updateNetamiBot(data["netami-bot"])
		updateTwitchBot(data["twitch-bot"])
		data_prev = data
	}
	catch (e) {
		console.error("Error parsing data:", e)
		console.error("Response text:", resp.responseText)
	}
}

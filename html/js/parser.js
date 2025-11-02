function updateDeviceName() {
	set("main-device-name", "Website Status")
}

function updateNetamiTV(data) {
	if (data.sites && data.sites.length > 0) {
		let status = data.sites[0].status === "online" ? "Online" : "Offline"
		set("main-netami-tv", status)
	} else {
		set("main-netami-tv", "N/A")
	}

	for (let site of data.sites) {
		let icon = site.status === "online" ? "check_circle" : "error"
		let response_time = site.response_time ? `${Math.round(site.response_time * 1000)}ms` : "N/A"
		mkItem("netami-tv-list", icon, site.url, [
			`Status: ${site.status}`,
			`Response time: ${response_time}`
		])
	}
}

function updateNetamiGames(data) {
	if (data.sites && data.sites.length > 0) {
		let status = data.sites[0].status === "online" ? "Online" : "Offline"
		set("main-netami-games", status)
	} else {
		set("main-netami-games", "N/A")
	}

	for (let site of data.sites) {
		let icon = site.status === "online" ? "check_circle" : "error"
		let response_time = site.response_time ? `${Math.round(site.response_time * 1000)}ms` : "N/A"
		mkItem("netami-games-list", icon, site.url, [
			`Status: ${site.status}`,
			`Response time: ${response_time}`
		])
	}
}

function updateMod(data) {
	if (data.sites && data.sites.length > 0) {
		let status = data.sites[0].status === "online" ? "Online" : "Offline"
		set("main-mod", status)
	} else {
		set("main-mod", "N/A")
	}

	for (let site of data.sites) {
		let icon = site.status === "online" ? "check_circle" : "error"
		let response_time = site.response_time ? `${Math.round(site.response_time * 1000)}ms` : "N/A"
		mkItem("mod-list", icon, site.url, [
			`Status: ${site.status}`,
			`Response time: ${response_time}`
		])
	}
}

function updateVincent(data) {
	if (data.sites && data.sites.length > 0) {
		let status = data.sites[0].status === "online" ? "Online" : "Offline"
		set("main-vincent", status)
	} else {
		set("main-vincent", "N/A")
	}

	for (let site of data.sites) {
		let icon = site.status === "online" ? "check_circle" : "error"
		let response_time = site.response_time ? `${Math.round(site.response_time * 1000)}ms` : "N/A"
		mkItem("vincent-list", icon, site.url, [
			`Status: ${site.status}`,
			`Response time: ${response_time}`
		])
	}
}

function updateNetamiBot(data) {
	if (data.sites && data.sites.length > 0) {
		let status = data.sites[0].status === "online" ? "Online" : "Offline"
		set("main-netami-bot", status)
	} else {
		set("main-netami-bot", "N/A")
	}

	for (let site of data.sites) {
		let icon = site.status === "online" ? "check_circle" : "error"
		let response_time = site.response_time ? `${Math.round(site.response_time * 1000)}ms` : "N/A"
		mkItem("netami-bot-list", icon, site.url, [
			`Status: ${site.status}`,
			`Response time: ${response_time}`
		])
	}
}

function updateTwitchBot(data) {
	if (data.sites && data.sites.length > 0) {
		let status = data.sites[0].status === "online" ? "Online" : "Offline"
		set("main-twitch-bot", status)
	} else {
		set("main-twitch-bot", "N/A")
	}

	for (let site of data.sites) {
		let icon = site.status === "online" ? "check_circle" : "error"
		let response_time = site.response_time ? `${Math.round(site.response_time * 1000)}ms` : "N/A"
		mkItem("twitch-bot-list", icon, site.url, [
			`Status: ${site.status}`,
			`Response time: ${response_time}`
		])
	}
}

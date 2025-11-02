import asyncio
import aiohttp
import time

from ..config import config

default_sites = {
    "netami-tv": ["https://netamitv.wispbyte.org/"],
    "netami-games": ["https://netamigames.wispbyte.org/"],
    "mod": ["https://mod.wispbyte.org/"],
    "vincent": ["https://vincent.wispbyte.org/"],
    "netami-bot": ["https://elias.wispbyte.org/"],
    "twitch-bot": ["http://87.106.82.84:14305/"]
}


class Website:

	@staticmethod
	async def ping_sites(group):
		sites = config.get("websites", group) or default_sites.get(group, [])
		if not sites:
			sites = default_sites.get(group, [])
		if not sites:
			return {"sites": [], "online_count": 0, "total": 0}

		results = []
		online_count = 0

		async with aiohttp.ClientSession(timeout=aiohttp.ClientTimeout(total=2)) as session:
			tasks = []
			for url in sites:
				tasks.append(Website._ping_single(session, url))

			responses = await asyncio.gather(*tasks, return_exceptions=True)

			for i, resp in enumerate(responses):
				url = sites[i]
				if isinstance(resp, Exception) or resp[0] is None:
					status = "offline"
					response_time = resp[1] if not isinstance(resp, Exception) else None
				else:
					status_code, response_time = resp
					status = "online" if status_code and 200 <= status_code < 300 else "offline"
					if status == "online":
						online_count += 1

				results.append({
					"url": url,
					"status": status,
					"response_time": response_time,
					"last_checked": time.time()
				})

		return {
			"sites": results,
			"online_count": online_count,
			"total": len(sites)
		}

	@staticmethod
	async def _ping_single(session, url):
		start_time = time.time()
		try:
			async with session.head(url) as resp:
				response_time = time.time() - start_time
				return resp.status, response_time
		except Exception:
			response_time = time.time() - start_time
			return None, response_time

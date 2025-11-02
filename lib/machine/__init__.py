from .website import Website


class Machine:

	def __init__(self):
		self.website = Website()

	async def get_full_info(self):
		return {
			"netami-tv": (await self.website.ping_sites("netami-tv")),
			"netami-games": (await self.website.ping_sites("netami-games")),
			"mod": (await self.website.ping_sites("mod")),
			"vincent": (await self.website.ping_sites("vincent")),
			"netami-bot": (await self.website.ping_sites("netami-bot")),
			"twitch-bot": (await self.website.ping_sites("twitch-bot"))
		}

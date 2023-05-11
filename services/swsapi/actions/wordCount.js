async function handler (ctx) {
	const {address, mode, key, strategy} = ctx.params;
	this.logger.info(`Requesting word count with params:\n"${JSON.stringify({address, mode, key, strategy}, null, 2)}"`);

	try {
		const result = await ctx.call('scraper.countWordsOnPage', {address, mode, key, strategy});
		if (result.status === 'OK') {
			this.logger.info(`Scrapper successfully computed the word count for: "${address}" (word count: ${result.wordCount})`);
			return {
				wordCount: result.wordCount,
			};
		} else if (result.status === 'ELEMENT_NOT_FOUND') {
			this.logger.warn(`Element with supplied key could not be found ${address}`);
			ctx.meta.$statusCode = 200;
			return {
				message: 'Element with supplied key was not found.'
			}
		} else if (result.status === 'ERROR') {
			this.logger.warn(`Scrapper failed to compute the word count for ${address}`);
			ctx.meta.$statusCode = 200;
			return {
				message: 'Could not compute the word count.' + (mode !== 'BROWSER' ? ' You might want to try setting MODE to BROWSER.' : '')
			}
		}
	} catch (error) {
		this.logger.error(`Call to scrapper with address ${address} failed.`, error);
		ctx.meta.$statusCode = 500;
	}
}


module.exports = handler;

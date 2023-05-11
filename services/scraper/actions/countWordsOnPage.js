const fetch = require('node-fetch');

async function handler (ctx) {
	const {address, mode, key, strategy} = ctx.params;
	try {
		let wordCount, html;

		if (!mode || mode === 'RAW') {
			html = await this.fetchHtml(address);
		} else if (mode === 'BROWSER') {
			html = await this.browserFetchHtml(address);
		}

		if (key) {
			wordCount = await this.getKeyWordCount(html, key, strategy);
		} else {
			wordCount = await this.countWordsInText(html)
		}

		if (wordCount === -1) {
			return {
				status: 'ELEMENT_NOT_FOUND'
			}
		}

		return {
			status: 'OK',
			wordCount
		}
	} catch (error) {
		this.logger.error('Error occurred while trying to compute word count!', error);
		return {
			status: 'ERROR'
		}
	}
}


module.exports = handler;

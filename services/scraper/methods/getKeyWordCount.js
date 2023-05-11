const cheerio = require('cheerio');

async function handler(html, key, strategy) {
	const $ = cheerio.load(html);

	const matches = $(key);

	if (matches.length < 1) {
		return -1;
	}

	if(strategy === 'FIRST' || !strategy) {
		const text = matches.first().text();
		this.logger.info(`Extracted first element matching key:\n${text}`);
		return this.countWordsInText(text);
	} else if(strategy === 'LAST') {
		const text = matches.last().text();
		this.logger.debug(`Extracted last element matching key:\n${text}`);
		return this.countWordsInText(text);
	} else if(strategy === 'ALL') {
		// cheerio automatically joins all matches when called with .text().
		const text = matches.text();
		this.logger.debug(`Extracted ${matches.length} elements matching key\n${text}.`);
		return this.countWordsInText(text);
	}

}

module.exports = handler;

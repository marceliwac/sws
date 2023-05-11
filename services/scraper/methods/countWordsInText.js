async function handler(text) {
	const cleanedText = text.replaceAll(/(\n)+|(\t)+/ig, ' ');
	return cleanedText.split(' ').length;
}

module.exports = handler;

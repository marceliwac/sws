async function handler (ctx) {
  const {address, mode, key, strategy} = ctx.params;
  try {
    let html;

    if (!mode || mode === "RAW") {
      html = await this.fetchHtml(address);
    } else if (mode === "BROWSER") {
      html = await this.browserFetchHtml(address);
    }

    let text = html;
    if (key) {
      text = await this.getTextByKey(html, key, strategy);
      if (text === null) {
        return {
          status: "ELEMENT_NOT_FOUND"
        };
      }
    }

    const wordCount = await this.countWordsInText(text);

    return {
      status: "OK",
      wordCount
    };
  } catch (error) {
    this.logger.error("Error occurred while trying to compute word count!", error);
    return {
      status: "ERROR"
    };
  }
}


module.exports = handler;

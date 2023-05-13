const fetch = require("node-fetch");

async function handler(address) {
  const response = await fetch(address);
  const text = await response.text();
  this.logger.info(`Fetched address ${address}`);
  return text;
}

module.exports = handler;

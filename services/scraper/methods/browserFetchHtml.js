const puppeteer = require("puppeteer");

async function handler(address) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
    ]
  });
  const page = await browser.newPage();
  await page.setViewport({width: 1280, height: 720});
  await page.goto(address);

  // Ensure page load
  await (new Promise(r => setTimeout(r, 3000)));

  this.logger.info(`Fetched address ${address} in browser.`);
  const content = await page.content();
  await browser.close();
  return content;
}

module.exports = handler;

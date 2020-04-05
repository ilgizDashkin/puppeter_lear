const puppeteer = require('puppeteer');

async function getPic() {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://ilgiz.h1n.ru');
  await page.setViewport({width: 500, height: 700})
  await page.screenshot({path: 'ilgiz.png'});

  await browser.close();
}

getPic();
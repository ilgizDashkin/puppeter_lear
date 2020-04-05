const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

(async ()=>{const browser = await puppeteer.launch({headless: false})
const page = await browser.newPage()
// await page.emulate(iPhone)
await page.goto('https://ilgiz.h1n.ru/searchPovKL/index.html')
await page.focus('.Search__input')
await page.keyboard.type('ф-86-32')
await page.waitFor(1000);
await page.screenshot({
    path: 'keyboard.png'
})

await browser.close()})()
import puppeteer from 'puppeteer';

/**
 * @type {puppeteer.Browser}
 */
let browser;

describe('ScrapperApp', () => {
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
  });
  test('e2e test', async () => {
    const page = await browser.newPage();
    await page.goto('http://google.com');
    await page.waitForSelector('body');
    const html = await page.$eval('body', e => e.innerHTML);
    console.log(html);
    expect(typeof html).toBe('string');
  });
});

import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
puppeteer.use(StealthPlugin());
import { writeFile } from 'fs';

const keyword = 'mobile';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1600,
    height: 1000,
    deviceScaleFactor: 1,
  });
  await page.goto('https://www.algonquincollege.com');
  //   await page.goto('https://git-scm.com/docs/git-pull');

  await page.screenshot({ path: './screens/algohome.jpg' });
  //   const btn = await page.waitForSelector('button.programSearchButton');
  //   await page.type('input#programSearch', keyword, { delay: 100 });
  //   await btn.click();

  await browser.close();
})();

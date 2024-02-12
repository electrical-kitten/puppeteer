import puppeteer from 'puppeteer';

const log = console.log;
const searchTermCLI =
  process.argv.length >= 3 ? process.argv[2] : 'defaultValue'; // =array
const searchTermENV = process.env.SEARCHTXT ?? 'defaultValue';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.youtube.com/');
  await page.waitForSelector('#search-input #search');
  await page.type('#search-input #search', searchTermCLI, { delay: 100 }); // (id или class элемента, то что будем вводить, задержка ввода что бы видеть)
  // await page.emulateVisionDeficiency('blurredVision');
  // await page.screenshot({ path: './screens/youtubeHomeBlurred.jpg' });
  // await page.emulateVisionDeficiency('none');
  // await page.screenshot({ path: './screens/youtubeHome.jpg' });
  await Promise.all([
    page.waitForNavigation(),
    page.click('#search-icon-legacy'),
  ]);
  await page.waitForSelector('ytd-video-renderer h3 a#video-title');
  await page.screenshot({ path: './screens/search-results.jpg' });

  await browser.close();
})();

// testing changes

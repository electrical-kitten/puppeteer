import puppeteer from 'puppeteer';

const log = console.log;
const searchTermCLI =
  process.argv.length >= 3 ? process.argv[2] : 'defaultValue'; // =array
const searchTermENV = process.env.SEARCHTXT ?? 'defaultValue';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.setViewport({
  //   width: 1600,
  //   height: 1000,
  //   deviceScaleFactor: 1,
  // });

  await page.goto('https://www.youtube.com/');
  await page.waitForSelector('#search-input #search');
  await page.type('#search-input #search', searchTermCLI, { delay: 100 }); // (id или class элемента, то что будем вводить, задержка ввода что бы видеть)
  // await page.emulateVisionDeficiency('blurredVision');
  // await page.screenshot({ path: './screens/youtubeHomeBlurred.jpg' });
  // await page.emulateVisionDeficiency('none');
  // await page.screenshot({ path: './screens/youtubeHome.jpg' });
  await Promise.all([
    page.waitForNavigation(),
    // page.waitForNetworkIdle(),
    page.click('#search-icon-legacy'),
  ]);
  await page.waitForSelector('ytd-video-renderer h3 a#video-title');
  await page.screenshot({ path: './screens/search-results.jpg' });

  const firstMatch = await page.$eval(
    'ytd-video-renderer h3 a#video-title',
    elem => {
      //runs when that a#video-title is found и возвращает innerText из элемента a#video-title
      return elem.innerText;
    }
  );
  console.log({ firstMatch });
  await Promise.all([
    page.waitForNavigation(),
    // page.waitForNetworkIdle(),
    page.click('ytd-video-renderer h3 a#video-title'),
    new Promise(resolve => setTimeout(resolve, 5000)),
  ]);
  await page.screenshot({ path: './screens/searchResultClick.jpg' });

  //get comments number
  await page.waitForSelector('ytd-comments-header-renderer');
  const videoComments = await page.$eval(
    'ytd-comments-header-renderer h2',
    h2 => {
      return h2.innerText;
    }
  );
  console.log({ videoComments });

  //get next video suggestion
  const firstSuggested = await page.$eval(
    'ytd-comments-header-renderer',
    elem => {
      return elem.querySelector('h3').innerText;
    }
  );
  console.log({ firstSuggested });

  await browser.close();
})();

fjklsdfjlkf;

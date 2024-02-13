import puppeteer from 'puppeteer';

const log = console.log;
// const searchTermCLI =
//   process.argv.length >= 3 ? process.argv[2] : 'defaultValue'; // =array
// const searchTermENV = process.env.SEARCHTXT ?? 'defaultValue';
const login = '(911) 117-8832';
const password = '12345';
const inventoryName = 'testPuppy';

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1400,
    height: 1000,
    deviceScaleFactor: 1,
  });

  await page.goto('https://multishik.cynteka.ru/#/goods/registry/all');
  // await page.waitForSelector('.login-wrapper #login #password');
  await page.waitForSelector('.login-wrapper');
  await page.waitForSelector('#password');
  await page.type('#login', login, { delay: 50 });
  await page.type('#password', password, { delay: 50 });
  await Promise.all([
    // page.wvigataitForNaion(),
    page.waitForNetworkIdle(),
    page.click('.btn-login'),
  ]);
  await page.waitForSelector('.registry-tile');
  await page.click('.icon');
  await page.waitForNetworkIdle();

  await page.click('.mat-input-element');
  await page.waitForSelector('.mat-autocomplete-panel');
  await page.click('.mat-option');

  await Promise.all([
    page.waitForNetworkIdle(),
    page.click('.sm-white'), // сохранить
  ]);
  // await page.click('.gray-sm-white'); // назад

  await page.waitForNetworkIdle();
  await page.screenshot({ path: './screens/facekitTest.jpg' });

  await page.waitForSelector('ytd-comments-header-renderer');
  const videoComments = await page.$eval(
    'ytd-comments-header-renderer h2',
    h2 => {
      return h2.innerText;
    }
  );
  console.log({ videoComments });

  await browser.close();
})();

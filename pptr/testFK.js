import puppeteer from 'puppeteer';

const log = console.log;
// const searchTermCLI =
//   process.argv.length >= 3 ? process.argv[2] : 'defaultValue'; // =array
// const searchTermENV = process.env.SEARCHTXT ?? 'defaultValue';
// await page.click('.gray-sm-white'); // назад
const login = '(911) 117-8832';
const password = '12345';
const destTransaction = 'Казакова';

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

  ////создание ТМЦ////
  await page.click('.icon');
  await page.waitForNetworkIdle();

  await page.click('.mat-input-element');
  await page.waitForSelector('.mat-autocomplete-panel');
  await page.click('.mat-option');
  await page.waitForNetworkIdle();
  await Promise.all([
    page.waitForNetworkIdle(),
    page.click('.sm-white'), // сохранить
  ]);

  await page.click('.check-text');
  await page.waitForNetworkIdle();
  await page.click('footer button');

  await page.waitForNetworkIdle();
  await page.click('.padding');
  await page.waitForNetworkIdle();
  await Promise.all([
    page.click('.control-default'),
    page.type('.control-default', destTransaction, { delay: 100 }),
    new Promise(resolve => setTimeout(resolve, 6000)),
  ]);
  await page.click('.fck-scroll ul li button'); // попробовать на кнопке переместить из карточки

  // const btnApply = await page.$eval('.between:nth-child(1)', elem => {
  //   return elem;
  // });
  // await Promise.all([
  //   await page.click('.between:nth-child(1)'),
  // ]);

  await page.waitForNetworkIdle(),
    await page.screenshot({ path: './screens/facekitTest.jpg' });

  await browser.close();
})();

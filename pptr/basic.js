import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // headless 'new' не показывает октрытие окна браузера, headless: false - показывает
  const page = await browser.newPage();

  //настройки страницы которые мы будем фидить браузеру
  await page.setViewport({
    width: 1600,
    height: 1000,
    isMobile: false,
    isLandscape: true,
    hasTouch: false,
    deviceScaleFactor: 1,
  });
  //   await page.setGeolocation({latitude: 49.5, longitude: 100.0});

  await page.goto("https://multishik.cynteka.ru/#/login");

  const url = await page.url();
  console.log(url);

  //   const content = await page.content(); // забирает код страницы и выводит в консоль
  //   console.log(content);

  await page.screenshot({
    path: "./screens/loginPageSample.jpg", // путь и имя скриншота
    fullPage: true,
  });
  await page.screenshot({
    path: "./screens/loginPageSample1.jpg",
    clip: { x: 200, y: 200, width: 500, height: 500 },
    encoding: "binary",
    type: "jpeg",
  });

  //   await page.type("input.login", "(911) 117-8832");
  //   await page.waitForSelector();

  await browser.close();
})();

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { selectors } from "./helpers/selectors";
import { evaluateTextContent } from "./helpers/evaluate";
import { Hotel } from "./types/hotel";
import { Browser, Page } from "puppeteer";

const chromium = require("@sparticuz/chromium");

puppeteer.use(StealthPlugin());
chromium.setHeadlessMode = true;
chromium.setGraphicsMode = false;

async function launchBrowser() {
  const executablePath = await chromium.executablePath();
  console.log(`path ${executablePath}`);
  console.log("init puppeteer");
  const browser = await puppeteer.launch({
    args: chromium.args,
    headless: chromium.headless,
    defaultViewport: chromium.defaultViewport,
    executablePath: executablePath,
  });
  console.log("browser abierto");
  return browser;
}

async function openPage(browser: Browser, url: string) {
  const page = await browser.newPage();
  console.log("pagina abierta");
  console.log(url);
  await page.goto(url, { waitUntil: "domcontentloaded" });
  console.log("domcontentloaded");
  return page;
}

async function getFirstResultUrl(page: Page): Promise<string | null> {
  const newUrl: string | null = await page.evaluate((selector: string) => {
    const firstResultUrl = document.querySelector(selector);
    return firstResultUrl ? (firstResultUrl as HTMLAnchorElement).href : null;
  }, selectors.firstResultUrlTag);

  if (!newUrl) {
    console.log("No URL found.");
    await page.browser().close();
    return null;
  }
  return newUrl;
}

async function scrapeHotelData(page: Page): Promise<Hotel | null> {
  const hotelName = await evaluateTextContent(page, selectors.hotelTitle);
  const hotelAddress = await evaluateTextContent(page, selectors.hotelAddress);
  const hotelDescription = await evaluateTextContent(
    page,
    selectors.hotelDescription
  );
  const hotelScore = await evaluateTextContent(page, selectors.hotelScore);

  if (!hotelName || !hotelAddress || !hotelDescription || !hotelScore) {
    console.log("Missing Hotel information.");
    await page.browser().close();
    return null;
  }

  const hotel: Hotel = {
    name: hotelName.trim(),
    address: hotelAddress.trim(),
    description: hotelDescription.trim(),
    score: hotelScore.split(" ")[1],
  };

  return hotel;
}

export const getHotelData = async (
  hotelSearch: string
): Promise<Hotel | null> => {
  const browser = await launchBrowser();
  const page = await openPage(
    browser,
    `http://www.booking.com/searchresults.es.html?ss=${hotelSearch}`
  );

  const newUrl = await getFirstResultUrl(page);
  if (!newUrl) return null;

  await page.goto(newUrl, { waitUntil: "domcontentloaded" });

  const hotelData = await scrapeHotelData(page);
  await browser.close();

  return hotelData;
};

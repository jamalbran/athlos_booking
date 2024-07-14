import { Page } from 'puppeteer';

export const evaluateTextContent = async (page: Page, selector: string): Promise<string | null> => {
  return page.evaluate((selector: string) => {
    const element = document.querySelector(selector);
    return element ? element.textContent : 'Data not found';
  }, selector);
};

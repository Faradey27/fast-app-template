import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import devices from 'puppeteer/DeviceDescriptors';
import { getSiteUrl, waiter } from './e2e-helpers';


class Browser {
  private browser: puppeteer.Browser = null;
  private page: puppeteer.Page = null;

  public launch = async () => {
    this.browser = await puppeteer.launch({
      args: [
        '--allow-insecure-localhost',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-popup-blocking',
        '--media-cache-size=0',
        '--disk-cache-size=',
      ],
      headless: process.env.HEADLESS !== 'false',
    });
    this.page = await this.browser.newPage();
  };

  public close = () => this.browser.close();

  public saveScreenshot = async ({ type, subtype, name }) => {
    await waiter();
    const formatedType = type.replace(/\s+/g, '_');
    const formatedName = name.replace(/\s+/g, '_');
    const formatedSubType = subtype ? `_${subtype.replace(/\s+/g, '_')}` : '';
    const title = `${formatedType}_${formatedSubType}_${formatedName}`;

    const pathToScreenshotsDir = path.join(__dirname, '__screenshots__');

    if (!fs.existsSync(pathToScreenshotsDir)) {
      fs.mkdirSync(pathToScreenshotsDir);
    }

    await this.page.screenshot({
      path: path.join(pathToScreenshotsDir, `${title}.png`),
      type: 'png',
    });
  }

  public openPage = async (name, device = 'iPhone 8') => {
    await this.page.emulate(devices[device]);
    await this.page.goto(getSiteUrl() + name, {
      waitUntil: 'networkidle0',
    });
  }
  public getPage = () => this.page;
}

export default Browser;

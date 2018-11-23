import Browser from '../../../../__test__/Browser';
import { waiter } from '../../../../__test__/e2e-helpers';
import ItemDriver from './../../Item/__test__/Item.e2e.driver';
import HomeDriver from './Home.e2e.driver';

const browser = new Browser();

describe('Home Page', () => {
  beforeAll(browser.launch);
  afterAll(browser.close);

  let driver: HomeDriver;

  beforeEach(async () => {
    driver = new HomeDriver({ browser });
    await driver.when.loaded();
  });

  it('Should show home page', async () => {
    expect(await driver.is.ok()).toBeTruthy();
  });

  it('Should go to item page', async () => {
    await driver.when.clickOnItem('1');
    await waiter(3000); // wait for loading of page
    const itemDriver = new ItemDriver({ browser });
    expect(await itemDriver.is.ok()).toBeTruthy();
  });
});

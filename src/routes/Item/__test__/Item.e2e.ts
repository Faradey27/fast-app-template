import Browser from '../../../../__test__/Browser';
import ItemDriver from './Item.e2e.driver';

const browser = new Browser();

describe('Item Page', () => {
  beforeAll(browser.launch);
  afterAll(browser.close);

  let driver: ItemDriver;

  beforeEach(async () => {
    driver = new ItemDriver({ browser });
    await driver.when.loaded();
  });

  it('Should show home page', async () => {
    expect(await driver.is.ok()).toBeTruthy();
  });
});

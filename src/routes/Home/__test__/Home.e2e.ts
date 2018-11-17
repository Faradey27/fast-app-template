import Browser from '../../../../__test__/Browser';
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
});

import Browser from '../../../../__test__/Browser';

export default class HomeDriver {
  constructor({ browser }: { browser: Browser } ) {
    this.browser = browser;
  }

  private browser: Browser;

  public when = {
    clickOnItem: async (id: string) => {
      this.browser.getPage().click(`[data-testid="${id}"]`);
      return this;
    },
    loaded: async () => {
      await this.browser.openPage('/');
      return this;
    },
  };

  public is = {
    itemPageLoaded: () => this.browser.getPage().waitForSelector('[data-testid="item-page"]'),
    ok: () => this.browser.getPage().waitForSelector('[data-testid="home-page"]'),
  };
}

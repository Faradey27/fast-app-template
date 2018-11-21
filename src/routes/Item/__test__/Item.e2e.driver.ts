import Browser from '../../../../__test__/Browser';

export default class ItemDriver {
  constructor({ browser }: { browser: Browser } ) {
    this.browser = browser;
  }

  private browser: Browser;

  public when = {
    loaded: async () => {
      await this.browser.openPage('/items/1');
      return this;
    },
  };

  public is = {
    ok: () => this.browser.getPage().waitForSelector('[data-hook="item-page"]'),
  };
}

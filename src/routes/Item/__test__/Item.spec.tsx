import ItemDriver from './Item.driver';

describe('Item Page', () => {
  let driver: ItemDriver;

  beforeEach(() => {
    driver = new ItemDriver();
  });

  it('should render correctly', () => {
    driver.given.prefetchData({ itemId: '2' }).when.created();
    expect(driver.is.ok()).toBeTruthy();
  });
});

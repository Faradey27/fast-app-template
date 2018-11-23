import { Router } from '../../../server/routes';
import HomeDriver from './Home.driver';

describe('Home Page', () => {
  let driver: HomeDriver;

  beforeEach(() => {
    Router.prefetchRoute = jest.fn();
    Router.pushRoute = jest.fn();
    driver = new HomeDriver();
  });

  afterEach(() => {
    Router.prefetchRoute.mockRestore();
    Router.pushRoute.mockRestore();
  })

  it('should render correctly', () => {
    driver.when.created();
    expect(driver.is.ok()).toBeTruthy();
  });

  it('should prefetch item page and go to it after click on item', () => {
    driver.when.created({
      items: [{ id: '1', name: 'Item 1' }]
    });
    expect(Router.prefetchRoute).toBeCalledWith('/items/1');

    driver.when.clickOnItem('1');
    expect(Router.pushRoute).toBeCalledWith('/items/1');
  });
});

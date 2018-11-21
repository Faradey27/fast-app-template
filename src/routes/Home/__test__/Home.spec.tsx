import { Router } from '../../../server/routes';
import HomeDriver from './Home.driver';

describe('Home Page', () => {
  let driver: HomeDriver;

  beforeEach(() => {
    Router.prefetchRoute = jest.fn();
    driver = new HomeDriver();
  });

  afterEach(() => {
    Router.prefetchRoute.mockRestore();
  })

  it('should render correctly', () => {
    driver.when.created();
    expect(driver.is.ok()).toBeTruthy();
  });
});

import HomeDriver from './Home.driver';

describe('Home Page', () => {
  let driver: HomeDriver;

  beforeEach(() => {
    driver = new HomeDriver();
  });

  it('should render correctly', () => {
    driver.when.created();
    expect(driver.is.ok()).toBeTruthy();
  });
});

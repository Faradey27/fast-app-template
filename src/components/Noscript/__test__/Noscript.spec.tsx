import NoscriptDriver from './Noscript.driver';

describe('Noscript component', () => {
  let driver: NoscriptDriver;

  beforeEach(() => {
    driver = new NoscriptDriver();
  });

  it('should render correctly', () => {
    driver.when.created();
    expect(driver.is.ok()).toBeTruthy();
  });

  it('should match snapshot', () => {
    driver.when.created();
    expect(driver.get.component()).toMatchSnapshot();
  });
});

import ErrorDriver from './Error.driver';

describe('Error Page', () => {
  let driver: ErrorDriver;

  beforeEach(() => {
    driver = new ErrorDriver();
  });

  it('should render correctly', () => {
    driver.when.created();
    expect(driver.is.ok()).toBeTruthy();
  });
});

import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import Error from './../index';

export default class ErrorDriver {
  private component: ReactWrapper;

  public when = {
    created: () => {
      this.component = mount(<Error statusCode="200" />);
      return this;
    },
  };

  public is = {
    ok: () => Boolean(this.component.find('[data-testid="error-page"]').length === 1),
  };
}

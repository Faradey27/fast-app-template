import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import Error from './../index';

export default class ErrorDriver {
  private component: ReactWrapper;

  when = {
    created: () => {
      this.component = mount(<Error statusCode="200"/>);
      return this;
    },
  };

  is = {
    ok: () => Boolean(this.component.find('[data-hook="error-page"]').length === 1),
  };
}

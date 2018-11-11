import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import Noscript from './../index';

export default class NoscriptDriver {
  private component: ReactWrapper;

  when = {
    created: () => {
      this.component = mount(<Noscript>Some text</Noscript>);
      return this;
    },
  };

  is = {
    ok: () => Boolean(this.component.find('[data-hook="noscript-component"]').length === 1),
  };

  get = {
    component: () => this.component
  }
}

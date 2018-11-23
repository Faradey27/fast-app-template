import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import Noscript from './../index';

export default class NoscriptDriver {
  private component: ReactWrapper;

  public when = {
    created: () => {
      this.component = mount(<Noscript>Some text</Noscript>);
      return this;
    },
  };

  public is = {
    ok: () => Boolean(this.component.find('[data-testid="noscript-component"]').length === 1),
  };

  public get = {
    component: () => this.component,
  };
}

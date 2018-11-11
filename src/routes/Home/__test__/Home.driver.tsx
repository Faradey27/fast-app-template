import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import Home from './../index';

export default class HomeDriver {
  private component: ReactWrapper;

  when = {
    created: () => {
      this.component = mount(<Home/>);
      return this;
    },
  };

  is = {
    ok: () => Boolean(this.component.find('[data-hook="home-page"]').length === 1),
  };
}

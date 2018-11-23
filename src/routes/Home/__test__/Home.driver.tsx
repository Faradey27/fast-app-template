import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import Home, { IHomeProps } from './../index';

export default class HomeDriver {
  private component: ReactWrapper;

  public when = {
    created: (props: IHomeProps = {}) => {
      this.component = mount(<Home {...props}/>);
      return this;
    },

    clickOnItem: (id: string) => {
      this.get.item(id).simulate('click');
      return this;
    }
  };

  public is = {
    ok: () => Boolean(this.component.find('[data-testid="home-page"]').length === 1),
  };

  public get = {
    item: (id: string) => this.component.find(`[data-testid="${id}"]`)
  };
}

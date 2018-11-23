import { mount, ReactWrapper } from 'enzyme';
import React from 'react';

import Item from './../index';

export default class ItemDriver {
  private component: ReactWrapper;

  public given = {
    prefetchData: ({ itemId }) => {
      (Item as any).getInitialProps({ query: { itemId } });
      return this;
    },
  };

  public when = {
    created: () => {
      this.component = mount(<Item />);
      return this;
    },
  };

  public is = {
    ok: () => Boolean(this.component.find('[data-testid="item-page"]').length === 1),
  };
}

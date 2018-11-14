import React from 'react';

import { IItem } from './types';

class ItemCard extends React.Component<IItem> {
  public render() {
    return (
      <div className="item-root">
        {this.props.name}
        <style>
          {`
            .item-root {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              border: 1px solid black;
              border-radius: 2px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default ItemCard;

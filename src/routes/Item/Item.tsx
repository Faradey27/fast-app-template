import React from 'react';
import { IItem } from './../../components/ItemCard/types';

interface IItemProps extends IItem {
  itemId: string;
}

class Item extends React.Component<IItemProps> {
  public static getInitialProps (props) {
    return {
      itemId: props.query.itemId,
    };
  }

  public render() {
    return (
      <div className="item-page" data-hook="item-page">
        <div className="content">
          {this.props.itemId}
        </div>
        <style>
          {`
            .item-page {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
            }
            .content {
              margin-top: 100px;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 200px;
              height: 200px;
              border: 1px dashed #000;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Item;

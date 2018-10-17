import React from 'react';

export interface IItem {
  id: string;
  name: string;
};

export class ItemCard extends React.Component<IItem> {
  render() {
    return (
      <div className="item-root">
        {this.props.name}3
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
    )
  }
}


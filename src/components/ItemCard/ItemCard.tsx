import React from 'react';
import Link from './../Link';
import { IItem } from './types';

class ItemCard extends React.Component<IItem> {
  public render() {
    return (
      <Link href={`/items/${this.props.id}`}>
        <div className="item-root" data-testid={this.props.id}>
          {this.props.name}
          <style jsx>{`
            .item-root {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              border: 1px solid black;
              border-radius: 2px;
            }
          `}</style>
        </div>
      </Link>
    );
  }
}

export default ItemCard;

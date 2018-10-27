import React from 'react';

import ItemCard from './../../components/ItemCard';
import { IItem } from './../../components/ItemCard/types';

interface IHomeProps {
  items: IItem[];
};

class Home extends React.Component<IHomeProps> {
  static defaultProps = {
    items: [
      {id: '1', name: 'Item 1'},
      {id: '2', name: 'Item 2'},
      {id: '3', name: 'Item 3'},
      {id: '4', name: 'Item 4'},
      {id: '5', name: 'Item 5'},
      {id: '6', name: 'Item 6'},
      {id: '7', name: 'Item 7'},
      {id: '8', name: 'Item 8'},
      {id: '9', name: 'Item 9'},
      {id: '10', name: 'Item 10'},
      {id: '11', name: 'Item 11'},
      {id: '12', name: 'Item 12'},
    ]
  }

  renderItems() {
    return this.props.items.map(item => (
      <div className="item-wrap" key={item.id}>
        <ItemCard {...item}/>
      </div>
    ))
  }

  render() {
    return (
      <div className="home-page">
        {this.renderItems()}
        <style>
          {`
            .home-page {
              display: flex;
              flex-wrap: wrap;
              justify-content: space-around;
            }
            .item-wrap {
              margin-top: 24px;
              width: 150px;
              height: 150px;
            }
          `}
        </style>
      </div>
    );
  }
}

export default Home;

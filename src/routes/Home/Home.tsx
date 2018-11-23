import React from 'react';
import ItemCard from './../../components/ItemCard';
import { IItem } from './../../components/ItemCard/types';
import ItemStyle from './components/ItemStyle';

export interface IHomeProps {
  items?: IItem[];
}

class Home extends React.Component<IHomeProps> {
  public static defaultProps = {
    items: [
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' },
      { id: '3', name: 'Item 3' },
      { id: '4', name: 'Item 4' },
      { id: '5', name: 'Item 5' },
      { id: '6', name: 'Item 6' },
      { id: '7', name: 'Item 7' },
      { id: '8', name: 'Item 8' },
      { id: '9', name: 'Item 9' },
      { id: '10', name: 'Item 10' },
      { id: '11', name: 'Item 11' },
      { id: '12', name: 'Item 12' },
    ],
  };

  public renderItems() {
    return this.props.items.map((item) => (
      <ItemStyle key={item.id}>
        <ItemCard {...item} />
      </ItemStyle>
    ));
  }

  public render() {
    return (
      <div className="home-page" data-testid="home-page">
        {this.renderItems()}
        <style jsx>{`
          .home-page {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
          }
        `}</style>
      </div>
    );
  }
}

export default Home;

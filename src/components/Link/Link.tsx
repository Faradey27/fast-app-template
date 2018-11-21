import React from 'react';
import { Router } from '../../server/routes';

interface ILinkWrapProps {
  href: string;
  children: any;
}

class LinkWrap extends React.Component<ILinkWrapProps> {
  public componentDidMount() {
    Router.prefetchRoute(this.props.href);
  }

  public render() {
    return (
      <a href={this.props.href} onClick={this.handleClick}>
        {this.props.children}
      </a>
    )
  }

  private handleClick = (e: React.MouseEvent<any>) => {
    e.preventDefault();
    Router.pushRoute(this.props.href);
  };
}

export default LinkWrap;

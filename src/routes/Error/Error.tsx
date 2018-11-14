import React from 'react';

export interface IErrorProps {
  statusCode: string;
}

class Error extends React.Component<IErrorProps, null> {
  public render() {
    return <div data-hook="error-page">{this.props.statusCode}</div>;
  }
}

export default Error;

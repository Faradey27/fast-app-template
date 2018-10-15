import React from 'react';

export interface IErrorProps {
  statusCode: string;
}

class Error extends React.Component<IErrorProps, null> {
  render() {
    return (
      <div>
        {this.props.statusCode}
      </div>
    );
  }
}

export default Error;

import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

const Noscript = (props: any) => {
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(props.children);

  return <noscript data-hook="noscript-component" dangerouslySetInnerHTML={{ __html: staticMarkup }} />;
};

export default Noscript;

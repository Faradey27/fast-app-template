import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server'

const Noscript = (props: any) => {
  const staticMarkup = ReactDOMServer.renderToStaticMarkup(props.children);

  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }} />
}

export default Noscript;

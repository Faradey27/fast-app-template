import * as spdy from 'spdy';

const withHTTP2 = ({options, server, port}) => {
  spdy
    .createServer(options, server)
    .listen(port, (err) => {
      if (err) {
        throw new Error(err);
      }

      console.info(`> Ready on https://localhost:${port}`);
    });
}

export default withHTTP2;

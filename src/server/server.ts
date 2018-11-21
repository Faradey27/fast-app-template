import * as express from 'express';
import * as nextBuilder from 'next';
import * as path from 'path';

import * as compression from 'compression';
import * as fs from 'fs';

import routes from './routes';
import { readStatics } from './utils/statics';
import withHTTP2 from './utils/withHTTP2';
import withHTTP2Push from './utils/withHTTP2Push';

require('@zeit/next-preact/alias')();

const PORT_HTTP = process.env.NODE_ENV === 'production' ? 80 : 3000;
const PORT_HTTPS = process.env.NODE_ENV === 'production' ? 443 : 3001;
const __DEV__ = process.env.NODE_ENV !== 'production';

const app = nextBuilder({
  dev: __DEV__,
  dir: path.resolve(__dirname, '..'),
});

const handleRoutes = routes.getRequestHandler(app);

const options = {
  cert: fs.readFileSync(__dirname + '/ssl/certificate/server.crt'),
  key: fs.readFileSync(__dirname + '/ssl/certificate/server.key'),
};

app.prepare().then(() => {
  const server = express();

  if (!__DEV__) {
    server.use(compression());
  }

  if (!__DEV__) {
    const rootPath = (app as any).distDir as string;
    const buildId = (app as any).buildId as string;
    const staticFiles = readStatics({ rootPath, buildId });

    withHTTP2Push(server, staticFiles);
  }

  server.use(express.static(path.join(__dirname, '../static')));

  // Enable reverse proxy support in Express. This causes the
  // the "X-Forwarded-Proto" header field to be trusted so its
  // value can be used to determine the protocol. See
  // http://expressjs.com/api#app-settings for more details.
  server.enable('trust proxy');

  server.use((req, res, next) => {
    if (__DEV__) {
      return handleRoutes(req, res, next);
    }

    if (req.path === '/service-worker.js') {
      const filePath = path.join(__dirname, '../.next', req.path);
      app.serveStatic(req, res, filePath);
    } else if (req.secure) {
      handleRoutes(req, res, next);
    } else {
      res.redirect('https://' + req.headers.host + req.url);
    }
  });

  server.listen(PORT_HTTP, (err) => {
    if (err) {
      throw err;
    }
    console.info(`> Ready on http://localhost:${PORT_HTTP}`);
  });

  if (!__DEV__) {
    withHTTP2({ options, server, port: PORT_HTTPS });
  }
});

import * as next from 'next';
import * as  express from 'express';

import * as compression from 'compression';
import * as fs from 'fs';

import routes from './routes';
import withHTTP2 from './utils/withHTTP2';
import withHTTP2Push from './utils/withHTTP2Push';
import { readStatics } from './utils/statics';

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handleRoutes = routes.getRequestHandler(app);

const options = {
  key: fs.readFileSync(__dirname + '/ssl/certificate/server.key'),
  cert: fs.readFileSync(__dirname + '/ssl/certificate/server.crt')
};

app.prepare()
  .then(() => {
    const server = express();

    if (process.env.NODE_ENV === "production") {
      server.use(compression());
    }

    if (process.env.NODE_ENV === 'production') {
      const rootPath = (app as any).distDir as string;
      const buildId = (app as any).buildId as string;
      const staticFiles = readStatics({rootPath, buildId});

      withHTTP2Push(server, staticFiles);
    }

    server.use(handleRoutes);

    server.listen(port, (err) => {
      if (err) throw err;
      console.info(`> Ready on http://localhost:${port}`);
    });

    if (process.env.NODE_ENV === 'production') {
      withHTTP2({options, server, port: port + 1});
    }
  })

import * as  express from 'express';
import * as next from 'next';
import * as compression from 'compression';
import * as spdy from 'spdy';
import * as fs from 'fs';

import routes from './routes';

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

  server.use((req, res, next) => {
    if (req.url === '/') {
      console.log((res as any).push, '---------------');
      if ((res as any).push) {
        fs.readFile('/_next/static/development/pages/index.js', (_error, data)=> {
          (res as any).push('/_next/static/development/pages/index.js', {}).end(data);
        });
      }
    }
    console.log(req.url);
    next();
  });

  server.use(handleRoutes);

  server.listen(port, (err) => {
    if (err) throw err;
    console.info(`> Ready on http://localhost:${port}`);
  });

  spdy
  .createServer(options, server)
  .listen(port + 1, (err) => {
    if (err) {
      throw new Error(err);
    }

    console.info(`> Ready on https://localhost:${port + 1}`);
  });
})

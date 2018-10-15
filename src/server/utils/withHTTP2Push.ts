

const withHTTP2Push = (server, statics) => {
  server.use((req, res, next) => {
    const pageNames = statics.filter(file => file.type === 'page').map(p => p.routeName);
    if (pageNames.indexOf(req.url) !== -1) {
      if ((res as any).push) {
        statics
          .filter(file => pageNames.indexOf(file.routeName) === -1 || file.routeName === req.url )
          .forEach(file => {
            (res as any).push(file.route, {'content-type': 'application/javascript'}, (err, stream) => {
              if (err) {
                return;
              }
              stream.end(file.data);
            });
          })
      }
    }
    next();
  });
}

export default withHTTP2Push;

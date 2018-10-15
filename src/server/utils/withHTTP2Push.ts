

const withHTTP2Push = (server, statics) => {
  server.use((req, res, next) => {
    if (req.url === '/') {
      if ((res as any).push) {
        statics.forEach(file => {
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

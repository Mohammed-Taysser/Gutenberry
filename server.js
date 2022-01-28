const PORT = 8000,
  StaticServer = require('static-server'),
  server = new StaticServer({
    rootPath: './',
    port:     PORT,
  });


server.start(() => {
  'use strict';
  console.info('Server listening to', server.port);
});

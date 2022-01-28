const PORT = 8000,
  StaticServer = require('static-server'),
  server = new StaticServer({
    rootPath: './',
    port:     PORT,
  });


server.start(() => {
  'use strict';
  window.console.log('Server listening to', server.port);
});

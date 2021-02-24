const io = require('socket.io')({
  path: '/socket.io',
  // origins: ['http://localhost:3000'],
  serveClient: !(
    process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'
  ),
});

io.init = function(server) {
  io.attach(server, {
    cors: {
      origin: 'http://localhost:3000', //true
      methods: ['GET', 'POST', 'FETCH'],
      credentials: true,
    },
    // below are engine.IO options
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false,
    // 1mb default package size
    maxHttpBufferSize: 1e6,
    allowEIO3: true,
  });
};

// old code
// const sockets = {};

// sockets.init = function(server) {
//   this.io = require('socket.io').listen(server, {
//     serveClient: !(
//       process.env.NODE_ENV === 'production' ||
//       process.env.NODE_ENV === 'staging'
//     ),
//     path: '/socket.io',
//   });
// };

module.exports = io;

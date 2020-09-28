const twitter = require('./twitter');
const io = require('./socket');
const EE = require('events').EventEmitter;
const showLog = require('./log');

const pubsub = new EE();
pubsub.setMaxListeners(30);

const stream = twitter.stream('statuses/filter', { track: ['youtube'] });

stream.on('tweet', data => {
  pubsub.emit('tweet', data);0
});

io.on('connection', client => {
  showLog(io);
  pubsub.on('tweet', data => {
    client.emit('tweet', data);
  });

  client.on('disconnect', () => {
    showLog(io);
  });
});

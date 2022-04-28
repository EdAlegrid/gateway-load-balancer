'use strict';

const m2m = require('m2m');

let client = new m2m.Client();

client.connect(() => {
  client.watchChannelData({id:1200, channel:'sb-1200'}, (data) => {
    console.log('watch gateway sb-1200', data);
  });
});

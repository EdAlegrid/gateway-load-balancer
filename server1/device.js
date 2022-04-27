'use strict';

const m2m = require('m2m');

let server = new m2m.Device(100);

server.connect(() => {
  server.setChannelData('test-data', (data) => {
    data.send({msg:'hello from server 100'});
  });
});

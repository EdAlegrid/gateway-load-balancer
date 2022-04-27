'use strict';

const m2m = require('m2m');

let server = new m2m.Device(200);

server.connect(() => {
  server.setChannelData('test-data', (data) => {
    data.send({msg:'hello from server 200'});
  });
});

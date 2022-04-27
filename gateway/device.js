'use strict';

const m2m = require('m2m');

let device = new m2m.Device(1200);

let server = 1;

function loadServer(id, data){
  device.getData({id:id, channel:'test-data'}, (d) => {
    if(d){
      setImmediate(() => {
        data.send(d);
      });
    }
  });
}

device.connect(() => {
  // Set server balancer 1200
  device.setChannelData('sb-1200', (data) => { 
    if(server === 1){
      server = 2;
      loadServer(100, data);
    }
    else if(server === 2){
      server = 3;
      loadServer(200, data);
    }
    else if(server === 3){
      server = 1;
      loadServer(300, data);
    }
  });
});

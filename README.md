# Gateway Load-Balancer

![](assets/gatewayLoadbalancer2.svg)

## A quick demo on how to create a simple gateway load balancer using m2m.

Ideally each application process should be running on separate nodes or computers (5 computers).

However for this quick demo you can just run each process in one computer.

You need to register 4 devices using the device id of **1200**, **100**, **200**, **300**.

You can follow the step-by-step procedure below and create the necessary directories as you go along or just git clone the project repository and just install m2m to each directory components.

 To git clone this project, use the command below.  
 ```js
$ git clone https://github.com/EdAlegrid/gateway-load-balancer.git
```

<br>

## Procedure 

### 1. Create a gatewate directory and install m2m

```js
$ npm install m2m
```
Save the code below as device.js to run your gateway.
```js
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
```

Start your gateway application.

```js
$ node device.js
```

<br>

### 2. Create a server1 directory and install m2m
Save the code below as device.js to run your 1st server.
```js
'use strict';

const m2m = require('m2m');

let server = new m2m.Device(100);

server.connect(() => {
  server.setChannelData('test-data', (data) => {
    data.send({msg:'hello from server 100'});
  });
});
```

Start your 1st server application.

```js
$ node device.js
```

<br>

### 3. Create server2 and server3 directory and install m2m
Follow the same procedure as with server1.

Save the same code but change the **deviceId** to **200** and **300** respectively instead of **100**.

Start each server the same with the 1st server.
```js
$ node device.js
```

<br>

### 4. Create a client directory and install m2m
Save the code below as client.js.
```js
'use strict';

const m2m = require('m2m');

let client = new m2m.Client();

client.connect(() => {
  client.watchChannelData({id:1200, channel:'sb-1200'}, (data) => {
    console.log('watch gateway sb-1200', data);
  });
});
```

Start your client application.

```js
$ node client.js
```

You should get an output result similar below.

```js
$ 
watch gateway sb-1200 { msg: 'hello from server 100' }
watch gateway sb-1200 { msg: 'hello from server 200' }
watch gateway sb-1200 { msg: 'hello from server 300' }
watch gateway sb-1200 { msg: 'hello from server 100' }
watch gateway sb-1200 { msg: 'hello from server 200' }
watch gateway sb-1200 { msg: 'hello from server 300' }
...

```


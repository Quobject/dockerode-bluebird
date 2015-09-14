# dockerode-bluebird

[![NPM](https://nodei.co/npm/dockerode-bluebird.png?downloads=true&downloadRank=true)](https://nodei.co/npm/dockerode-bluebird/)
[![NPM](https://nodei.co/npm-dl/dockerode-bluebird.png?months=6&height=3)](https://nodei.co/npm/dockerode-bluebird/)

See [https://github.com/apocas/dockerode/pull/108](https://github.com/apocas/dockerode/pull/108).

## Node.js

    npm install dockerode-bluebird

Then:

```js
var Docker = require("dockerode-bluebird");
```

## Usage

```js
var docker = new Docker({socketPath: '/var/run/docker.sock'});

var data = {
    Image: 'mesoscloud/zookeeper:3.4.6-ubuntu-14.04',
    //Cmd: [],
    'ExposedPorts': {
      '2181/tcp': {}
    },
    name: 'zookeeper',
    HostConfig: {
      PortBindings: {
        "2181/tcp": [
            {
              "HostPort": "2181"
            }
        ]
      }
    }
};

docker.createContainerAsync(data).then( function(container) {
  console.log('startZookeeper container = ' + container);
  return container.startAsync();
}).catch(function(error) {
  console.log('startZookeeper error = ' + error);
}).finally( function() {
  console.log('startZookeeper finally ');
});
```
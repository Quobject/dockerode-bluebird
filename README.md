# dockerode-bluebird
dockerode bluebird from https://github.com/d6u/Dockership/blob/master/lib/promisified/docker-promisified.js as discussed in https://github.com/apocas/dockerode/pull/108.

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
}).catch(function(error) {
  console.log('startZookeeper error = ' + error);
}).finally( function() {
  console.log('startZookeeper finally ');
});
```
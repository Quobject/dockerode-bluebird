// from https://github.com/d6u/Dockership/blob/master/lib/promisified/docker-promisified.js 
// Added code for image
'use strict';

var Bluebird = require('bluebird');
var Docker = require('dockerode');

Bluebird.promisifyAll(Docker.prototype);

var _getContainer = Docker.prototype.getContainer;

Docker.prototype.getContainer = function () {
  var container = _getContainer.apply(this, arguments);
  if (!container.startAsync) {
    var containerPrototype = Object.getPrototypeOf(container);

    var _exec = containerPrototype.exec;
    containerPrototype.exec = function (opts, cb) {
      _exec.call(this, opts, function (err, exec) {
        if (exec && !exec.startAsync) {
          Bluebird.promisifyAll(Object.getPrototypeOf(exec));
        }
        cb(err, exec);
      });
    };

    Bluebird.promisifyAll(containerPrototype);
  }
  return container;
};

var _getImage = Docker.prototype.getImage;

Docker.prototype.getImage = function () {
  var image = _getImage.apply(this, arguments);
  if (!image.getAsync) {
    var imagePrototype = Object.getPrototypeOf(image);
    Bluebird.promisifyAll(imagePrototype);
  }  
  return image;
};

module.exports = Docker;
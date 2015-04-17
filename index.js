'use strict';
var EventEmitter = require('events').EventEmitter,
    util = require('util'),
    Q = require('q');

function QEmitter() {
    EventEmitter.call(this);
}

util.inherits(QEmitter, EventEmitter);

QEmitter.prototype.emitAndWait = function(type) {
    var args = Array.prototype.slice.call(arguments, 1),
        listeners = this.listeners(type);
    return Q.all(listeners.map(function(listener) {
        return listener.apply(this, args);
    }));
};

module.exports = QEmitter;

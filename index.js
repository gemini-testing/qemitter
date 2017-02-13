'use strict';

const _ = require('lodash');
const EventEmitter = require('events').EventEmitter;
const Q = require('q');

module.exports = class QEmitter extends EventEmitter {
    emitAndWait(type) {
        const args = _(arguments).values().tail().value();
        const listeners = this.listeners(type);
        return Q.all(listeners.map((listener) => listener.apply(this, args)));
    }
};

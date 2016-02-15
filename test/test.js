'use strict';
var QEmitter = require('..'),
    Q = require('q');

describe('QEmitter', function() {
    it('wait until the promise from handler is resolved', function() {
        var afterWait = sinon.spy().named('afterWait'),
            insideHandler = sinon.spy().named('insideHandler'),
            emitter = new QEmitter();

        emitter.on('event', function() {
            return Q.delay(100)
                .then(insideHandler);
        });

        return emitter.emitAndWait('event')
            .then(afterWait)
            .then(function() {
                assert.callOrder(insideHandler, afterWait);
            });
    });

    it('should pass the arguments', function() {
        var listener = sinon.spy().named('listener'),
            emitter = new QEmitter();
        emitter.on('event', listener);
        return emitter.emitAndWait('event', 'arg1', 'arg2')
            .then(function() {
                assert.calledWith(listener, 'arg1', 'arg2');
            });
    });
});

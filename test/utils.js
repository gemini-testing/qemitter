'use strict';

var QEmitter = require('..'),
    utils = require('../utils'),
    Q = require('q');

describe('QEmitter/utils', function() {
    describe('passthroughEvent', function() {
        it('should passthrough event', function() {
            var from = new QEmitter(),
                to = new QEmitter(),
                spy = sinon.spy();

            utils.passthroughEvent(from, to, 'some-event');
            to.on('some-event', spy);

            from.emit('some-event', 'val1', 'val2');

            assert.calledWith(spy, 'val1', 'val2');
        });

        it('should passthrough all passed events', function() {
            var from = new QEmitter(),
                to = new QEmitter(),
                someSpy = sinon.spy().named('someSpy'),
                otherSpy = sinon.spy().named('otherSpy');

            utils.passthroughEvent(from, to, ['some-event', 'other-event']);
            to.on('some-event', someSpy);
            to.on('other-event', otherSpy);

            from.emit('some-event', 'v1', 'v2');
            from.emit('other-event', 'd1', 'd2');

            assert.calledWith(someSpy, 'v1', 'v2');
            assert.calledWith(otherSpy, 'd1', 'd2');
        });

        it('should wait until the promise from `to` handler is resolved', function() {
            var from = new QEmitter(),
                to = new QEmitter(),
                afterWait = sinon.spy().named('afterWait'),
                insideHandler = sinon.spy().named('insideHandler');

            utils.passthroughEvent(from, to, 'some-event');
            to.on('some-event', function() {
                return Q.delay(100)
                    .then(insideHandler);
            });

            return from.emitAndWait('some-event')
                .then(afterWait)
                .then(function() {
                    assert.callOrder(insideHandler, afterWait);
                });
        });
    });
});

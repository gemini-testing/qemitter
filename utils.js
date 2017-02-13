'use strict';

const mkPassthroughFn = (methodName) => {
    const passEvents = (from, to, event) => {
        if (typeof event === 'string') {
            from.on(event, to[methodName].bind(to, event));
            return;
        }
        event.forEach((event) => passEvents(from, to, event));
    };

    return passEvents;
};

exports.passthroughEvent = mkPassthroughFn('emit');
exports.passthroughEventAsync = mkPassthroughFn('emitAndWait');

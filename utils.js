'use strict';

function passthroughEvent(from, to, event) {
    if (typeof event === 'string') {
        from.on(event, to.emitAndWait.bind(to, event));
        return;
    }

    event.forEach(passthroughEvent.bind(null, from, to));
}

exports.passthroughEvent = passthroughEvent;

# QEmitter

Node.js event emitter with promises support.

Node.js builtin `EventEmmiter` class executes all handlers synchronously without
waiting for completion of any async operations that may happen inside.

`QEmitter` is the subclass of `EventEmmiter` which adds ability to return a
promise from event handler and wait until it resolved. Just use `emitAndWait`
instead of `emit`:

```javascript
var emitter = new QEmitter();
emitter.on('event', function() {
    return Q.delay(1000);
});

emmiter.emitAndWait('event')
    .then(function() {
        console.log('All handlers finished');
    });
```

`emitAndWait` returns [`Q`](https://github.com/kriskowal/q) promise.

## utils

### passthroughEvent(from, to, event)

Passes event from `from` to `to`.

`event` can be an array of events.

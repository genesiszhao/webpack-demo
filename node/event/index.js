const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()

emitter.on('start', (data) => {
  console.log(data)
})
emitter.emit('start', 1)

// on off once removeListener

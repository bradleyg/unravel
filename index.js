var fs = require('fs')
var path = require('path')
var events = require('events')

var unravel = module.exports = new events.EventEmitter
var count = 0

unravel.dir = function(dir) {
  var self = this
  fs.stat(dir, function(err, stat){
    if(err || ! stat.isDirectory()) return self.emit('error', err || 'not a directory')
    unravel.read(dir)
  })
}

unravel.read = function(dir) {
  var self = this
  var files = []
  count++
  
  fs.readdir(dir, function(err, files) {
    if (err) self.emit('error', err)
    count--
    
    files.forEach(function(file) {
      file = path.join(dir, file)
      count++

      fs.stat(file, function(err, stat) {
        count--
        if (err) return self.emit('error', err)
        if (stat.isDirectory()) return unravel.read(file)
        
        self.emit('file', file)
        if (count == 0) self.emit('end')
      })
    })
  })
}
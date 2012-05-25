var fs = require('fs')
var path = require('path')
var events = require('events')

var unravel = module.exports = new events.EventEmitter

unravel.dir = function(base) {
  var count = 0
  var self = this
  
  fs.stat(base, function(err, stat){
    if(err || ! stat.isDirectory()) return self.emit('error', err || 'not a directory')
    
    var read = function(dir) {
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
            if (stat.isDirectory()) return read(file)
    
            self.emit('file', file)
            if (count == 0) self.emit('end')
          })
        })
      })
    }
    
    read(base)
  })
}


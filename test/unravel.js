var unravel = require('../index.js')
var should = require('should')
var path = require('path')

// tests

describe("unravel", function () {
  
  describe('unravel.dir()', function(){
    
    it('should read the contents of the example folder and skip empty directories', function(done){
      unravel.dir(__dirname)
      
      var files = [
        '/Users/bradley/Sites/unravel/test/unravel.js'
      ]
      
      var count = files.length
      
      unravel.on('file', function(file){
        files.indexOf(file).should.not.eql(-1)
        count--
      })
      
      unravel.on('end', function(){
        count.should.eql(0)
        done()
      })
    })
    
    it('should return an error if the given param is a file', function(done){
      unravel.dir(path.join(__dirname, '../example/example.js'))
      unravel.on('error', function(err){
        err.should.eql('not a directory')
        done()
      })
    })
    
  }) 
 
})
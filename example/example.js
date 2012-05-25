var unravel = require('../index.js')

unravel.dir(__dirname)

unravel.on('file', function(file){
  console.log(file)
})

unravel.on('end', function(){
  console.log('end')
})

unravel.on('error', function(err){
  console.log(err)
})
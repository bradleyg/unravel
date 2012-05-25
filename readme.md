###Unravel - Streaming recursive directory reading.   
Install: ```npm install unravel```
***
###unravel.dir(directory):  
Pass the folder to recursively read. Events ```file```, ```end``` and ```error``` will be emitted.   
```
var unravel = require('unravel')

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
```  
###Examples: 
[View the examples](https://github.com/bradleyg/unravel/blob/master/example/example.js)  
***
###Tests  
```
npm test
```  

[![Build Status](https://secure.travis-ci.org/bradleyg/unravel.png)](http://travis-ci.org/bradleyg/unravel)
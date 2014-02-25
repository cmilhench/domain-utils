var fs = require('fs');

//------------------------------------------------------------------
// Auto-load hierarchy with getters.

fs.readdirSync(__dirname).forEach(function(filename){
  if (/index\.js$/.test(filename)) return;
  exports.__defineGetter__(filename, function (){ 
    return require('./' + filename); 
  });
});
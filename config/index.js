var fs = require('fs'), path = require('path'), basename = path.basename;

//------------------------------------------------------------------
// Auto-load config with getters.

fs.readdirSync(__dirname).forEach(function(filename){
  if (/index\.js$/.test(filename) || 
      /.*?\.prod\.js$/.test(filename) ||
      !/\.js$/.test(filename)) return;
  var name = basename(filename, '.js');
  var prod = path.join(__dirname, name + '.prod.js')
  var load = function (){ return require('./' + name); }
  
  if (process.env.NODE_ENV === 'production' && fs.existsSync(prod)) {
    load = function (){ return require(prod); }
  }
  exports.__defineGetter__(name, load);
});
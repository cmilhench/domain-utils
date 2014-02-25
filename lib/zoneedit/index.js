var http = require('http');

exports.dynamic = function(host, auth, fn){
  http.get({ 
  	host:'dynamic.zoneedit.com', 
  	path: '/auth/dynamic.html?host=' + host, 
  	headers: { 'Authorization': 'Basic ' + auth }
  }, function(response) {
    var result = {
      statusCode : response.statusCode,
      raw: ''
    }
	  response.on('data', function (chunk) {
	    result.raw += chunk;
	  });
	  response.on('end', function () {
      var test = /<.*?code="(\d*?)".*?text="(.*?)".*?zone="(.*?)".*?>/i;
      var match = test.exec(result.raw);
      if (match) {
        result.statusCode = parseInt(match[1], 10);
        result.text = match[2];
        result.zone = match[3];
      }
      if (fn) fn(null, result);
	  });
	}).on('error', function(error) {
    if (fn) fn(error.message, result);
	});
};
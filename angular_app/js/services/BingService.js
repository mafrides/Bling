angular.module('SimpleBingClone').factory('BingService', [ '$http', function ($http) {
  // Usage: options = { service: <service>, market: <market> }
  // returns a Promise
  return function (querystring, options) {
  	options = typeof options === 'object' ? options : {};
  	// Yes, this should come from a config, but for now...
  	var appRoot = 'http://localhost:3000'
  	  , uri = appRoot + '/bing' +
  	  		  (options.service ? ('/' + options.service) : '') +
  	  		  '?query=' + (querystring || '') +
  	  		  (options.market ? ('&' + options.market) : '')
  	  ;

    return $http.get(uri);
  };
}]);
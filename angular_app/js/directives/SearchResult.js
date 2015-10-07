angular.module('SimpleBingClone').directive('searchResult', [ function () {
  return { templateUrl: 'html/search-result.html'
  		 , restrict: 'E'
         , scope: { result: '=' }
         };
}]);
angular.module('SimpleBingClone').directive('searchBar'
                                           , [ 'BingService'
                                             , 'usSpinnerService'
                                             , function ( BingService
                                                        , usSpinnerService
                                                        ) {
  return { templateUrl: 'html/search-bar.html'
  		   , restrict: 'E'
         , scope: { results: '=' }
  	     , link: function (scope, element) { 
  	         scope.query = "";
             scope.options = {};
             scope.results = [];

             scope.search = function () {	
               usSpinnerService.spin('spinner-1');
               BingService(encodeURIComponent(scope.query), scope.options)
                 .success(function (data, status) {
                    usSpinnerService.stop('spinner-1');
                    if (status !== 200) {
                      return scope.results =
                        [ { Url: ""
                          , Title: "There was an error getting your search results, try again."
                          , Description: "" 
                          }
                        ];
                    }

                    data = JSON.parse(data);
      	            scope.results = data.d.results;
                 });
             };

             // Enter triggers search
             element.bind('keyup', function (event) {
                if (event.which == 13) {
                  scope.search();
                }
             })
  	       }
         };
}]);
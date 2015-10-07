angular.module('SimpleBingClone').config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', 
      { templateUrl: 'html/home.html'
      , controller: 'HomeController'
   	  , controllerAs: 'HomeCtrl'
   	  })
    .otherwise({ redirectTo: '/' });

  $locationProvider.html5Mode(true);
});
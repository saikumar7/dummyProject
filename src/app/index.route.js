(function() {
  'use strict';

  angular
    .module('testProject')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('error', {
        url: '/error',
        templateUrl: 'app/components/views/error.html',
        controller: 'ErrorController',
        controllerAs: 'errorCtrl'
      });

    $urlRouterProvider.otherwise('/');
  }

})();

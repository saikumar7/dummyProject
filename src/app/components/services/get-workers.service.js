(function() {
    'use strict';
  
    angular
    .module('testProject')
    .factory('getWorkersFactory', getWorkersFactory);
  
    
    /** @ngInject */
    function getWorkersFactory ($http) {
      
      var urlBase = 'http://10.160.96.42:8044/Placement/WorkersWithActiveCases';
     
      var getWorkersFactory = {};
  
      getWorkersFactory.getActiveWorkers = function () {
        return $http.get(urlBase);
      };
      
      return getWorkersFactory;    
      }
      
  })();
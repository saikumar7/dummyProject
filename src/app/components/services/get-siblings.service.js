(function () {
  'use strict';

  angular
    .module('testProject')
    .factory('getSiblingsFactory', getSiblingsFactory);


  /** @ngInject */
  function getSiblingsFactory($http) {

    //var urlBase = 'http://10.160.96.42:8044/Placement/GetChildren';
    var urlBase = 'http://10.15.66.88/CCWISRest/Placement/GetChildren';

    var getSiblingsFactory = {};

    getSiblingsFactory.getData = function (id) {

      var config = {
        params: {
          'CaseId': id
        }
      };
      return $http.get(urlBase, config);
    };

    return getSiblingsFactory;
  }

})();

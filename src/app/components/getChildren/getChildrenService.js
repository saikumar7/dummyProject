(function() {
  'use strict';

  angular
  .module('placementMatchingTool')
  .factory('getChildrenFactory', getChildrenFactory);

  getChildrenFactory.$inject = ['$http'];

  function getChildrenFactory ($http) {
    
    // var urlBase = 'http://10.160.100.121:8044/Placement/CurrentPlacements';
    var urlBase = 'assets/mock/data.json';
    
    var getChildrenFactory = {};

    getChildrenFactory.getChildren = function () {
      return $http.get(urlBase);
    };

    getChildrenFactory.getChild = function (PersonID) {
        return $http.get(urlBase + '/' + PersonID);
    };

    // getChildrenFactory.insertChild = function (child) {
    //     return $http.post(urlBase, child);
    // };

    // getChildrenFactory.updateChild = function (child) {
    //     return $http.put(urlBase + '/' + child.PersonID, child);
    // };


    return getChildrenFactory;    
    }
    
})();
(function() {
  'use strict';

  angular
  .module('testProject')
  .factory('getChildrenFactory', getChildrenFactory);

  
  /** @ngInject */
  function getChildrenFactory ($http) {
    
    var urlBase = 'http://10.160.96.42:8044/Placement/CurrentPlacements';
    //var urlBase = 'app/components/children.json'; 
   
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
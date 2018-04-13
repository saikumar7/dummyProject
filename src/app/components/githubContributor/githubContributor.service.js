(function() {
  'use strict';

  angular
    .module('testProject')
    .factory('githubContributor', githubContributor);

  /** @ngInject */
  function githubContributor($log, $http) {
    var apiHost = 'https://api.github.com/repos/Swiip/generator-gulp-angular';

    var service = {
      apiHost: apiHost,
      getContributors: getContributors
    };

    return service;

    function getContributors(limit) {
      if (!limit) {
        limit = 30;
      }

      return $http.get(apiHost + '/contributors?per_page=' + limit)
        .then(getContributorsComplete)
        .catch(getContributorsFailed);

      function getContributorsComplete(response) {
        return response.data;
      }

      function getContributorsFailed(error) {
        $log.error('XHR Failed for getContributors.\n' + angular.toJson(error.data, true));
      }
    }
  }
})();

//SERVICE
 // function getChildrenList($http, $q) {
    
 //    var deferred = $q.defer();
 //    $http.get('http://10.15.66.88:8182/CPSSvc/').then(function(data){
 //      deferred.resolve(data);
 //    });

 //    this.getChidren = function () {
 //      return deferred.promise;
 //    }

 //  }


//CONTROLLER
// function MainController($scope, getChildrenList) {

//     var vm = this;
//     var promise = getChildrenList.getChidren();
//     promise.then(function(data){
//       vm.lists = data;
//         console.log(vm.lists);
//     })
//   }
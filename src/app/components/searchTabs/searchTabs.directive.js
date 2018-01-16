(function() {
  'use strict';

  angular
    .module('testProject')
    .directive('searchTabs', searchTabs);

  /** @ngInject */
  function searchTabs() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/searchTabs/searchTabs.html',
      scope: {
          creationDate: '='
      },
      controller: searchTabsController,
      controllerAs: 'tab',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function searchTabsController(setTabsService, $scope) {

          var vm = this;
          vm.tab = 2;

          vm.Set = function(checkTab) {
            return setTabsService.isSet(checkTab);
          };

          vm.Tab = function(activeTab) {
            return setTabsService.setTab(activeTab);
          };

          vm.clear = function () {
            $scope.$broadcast('angucomplete-alt:clearInput');
          }

          // vm.isSet = function(checkTab) {
          //   return vm.tab === checkTab;
          // };

          // vm.setTab = function(activeTab) {
          //   vm.tab = activeTab;
          // };
    }
  }

})();

(function() {
  'use strict';

  angular
    .module('testProject')
    .directive('searchTabs', searchTabs);

  /** @ngInject */
  function searchTabs() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/search-tabs/search-tabs.html',
      scope: true,
      controller: searchTabsController,
      controllerAs: 'tab',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function searchTabsController(setTabsService, $scope) {

          var vm = this;
          vm.tab = 2;

          vm.set = function(checkTab) {
            return setTabsService.isSet(checkTab);
          };

          vm.tab = function(activeTab) {
            return setTabsService.setTab(activeTab);
          };

          vm.clear = function () {
            $scope.$broadcast('clickTab');         
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

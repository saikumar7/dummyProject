(function() {
  'use strict';

  angular
    .module('placementMatchingTool')
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
    function searchTabsController() {
      var vm = this;
      vm.tab = 2;

      vm.isSet = function(checkTab) {
        return vm.tab === checkTab;
      };

      vm.setTab = function(activeTab) {
        vm.tab = activeTab;
      };
    }
  }

})();

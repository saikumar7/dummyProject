(function() {
  'use strict';

  angular
    .module('testProject')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'nav',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(setTabsService, $rootScope, $scope) {
      var vm = this;
      vm.tab = 2;
      $scope.isCollapsed = true;

      vm.set = function (checkTab) {
        return setTabsService.isSet(checkTab);
      };

      vm.tab = function (activeTab) {
        return setTabsService.setTab(activeTab);
      };

      vm.clear = function () {
        $scope.$broadcast('clickTab');
      };
    }
  }

})();

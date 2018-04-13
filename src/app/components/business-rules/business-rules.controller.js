(function () {
  'use strict';

  angular
    .module('testProject')
    .controller('BusinessRulesController', BusinessRulesController);

  /** @ngInject */
  function BusinessRulesController(setTabsService, $uibModalInstance) {
    var vm = this;

    //check tabs
    vm.set = function (checkTab) {
      return setTabsService.isSet(checkTab);
    };

    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();

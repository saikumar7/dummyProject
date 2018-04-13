(function () {
  'use strict';

  angular
    .module('testProject')
    .service('setTabsService', setTabsService);

  /** @ngInject */
  function setTabsService() {
    this.tab = 2;

    this.isSet = function (checkTab) {
      return this.tab === checkTab;
    };

    this.setTab = function (activeTab) {
      return this.tab = activeTab;
    };
  }
})();

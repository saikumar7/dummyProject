(function() {
  'use strict';

  angular
    .module('testProject')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();

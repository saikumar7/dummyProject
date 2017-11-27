(function() {
  'use strict';

  angular
    .module('placementMatchingTool')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
   
  }

})();

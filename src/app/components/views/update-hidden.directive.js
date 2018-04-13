(function () {
  'use strict';

  angular
    .module('testProject')
    .directive('ngUpdateHidden', ngUpdateHidden);

  function ngUpdateHidden() {
    var directive = {
      restrict: 'AE', //attribute or element
      scope: {},
      replace: true,
      require: 'ngModel',
      link: function ($scope, elem, attr, ngModel) {
        $scope.$watch(ngModel, function (nv) {
          elem.val(nv);
        });
        elem.change(function () { //bind the change event to hidden input
          $scope.$apply(function () {
            ngModel.$setViewValue(elem.val());
          });
        });
      }
    };
  }
})();

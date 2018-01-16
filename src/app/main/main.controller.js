(function() {
  'use strict';

  angular
    .module('testProject')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($http, $log, $scope) {
    var vm = this;
    vm.advancedOptions = [];
    $scope.regionType = [];
    $scope.disabilityType = [];
    $scope.serviceTypes = [];
    vm.status;

    
    //var data = $http.get('http://10.15.66.88/CCWISRest/Placement/DropDownData');
      
      // $http.get('http://10.15.66.88/CCWISRest/Placement/DropDownData').then(function(response) {

      //   vm.advancedOptions = angular.fromJson(response.data);
      //   $scope.regions = vm.advancedOptions['Regions'];
      //   $scope.disabilities = structureData(vm.advancedOptions['Disabilities'][0]);
      //   $scope.serviceTypes = structureData(vm.advancedOptions['ServiceTypes'][0]);
      // });

      function getOptions () {
        $http.get('http://10.15.66.88/CCWISRest/Placement/DropDownData')
              .then(function(response){
                vm.advancedOptions = angular.fromJson(response.data);
                $scope.regions = vm.advancedOptions['Regions'];
                $scope.disabilities = structureData(vm.advancedOptions['Disabilities'][0]);
                 $scope.serviceTypes = structureData(vm.advancedOptions['ServiceTypes'][0]);
                }, function (error) {
                   vm.status = error.status;              
                   $location.url('/error');
               });
      }
      
      function structureData(arr) {
        if (!Array.isArray(arr)) { return []; }

        var newArr = [];
        for (var i = 0; i < arr.length; i++) {
          var keys = Object.keys(arr[i]);
          
          for (var j = 0; j < keys.length; j++) {
            var obj = {};
            obj.value = keys[j];
            obj.key = arr[i][keys[j]];
            newArr.push(obj);
          }
        }
        return newArr;
      }
    

     angular.element(document).ready(function () {
      // $("#sidebar").mCustomScrollbar({
      //     theme: "minimal"
      // });

      angular.element('#dismiss, #apply, .overlay').on('click', function () {
        angular.element('#sidebar').addClass('collapse');
          angular.element('#sidebar').removeClass('active');
          angular.element('.overlay').fadeOut();
      });

      angular.element('#sidebarCollapse').on('click', function () {
        angular.element('#sidebar').removeClass('collapse');
        angular.element('#sidebar').addClass('active');
          angular.element('#sidebar').addClass('active');
          angular.element('.overlay').fadeIn();
          angular.element('.collapse.in').toggleClass('in');
       });
    });   
  }
})();

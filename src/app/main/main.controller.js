(function () {
  'use strict';

  angular
    .module('testProject')
    .controller('MainController', MainController);
  //.controller('BusinessRulesController', BusinessRulesController);

  /** @ngInject */
  function MainController(setTabsService, $rootScope, $http, $log, $scope, $location, $uibModal, $state) {
    var vm = this;
    vm.advSearch = {};
    vm.advSearch.maxdistance = null;
    vm.advancedOptions = [];
    vm.regions = [];
    vm.disabilities = [];
    vm.services = [];
    vm.status;
    vm.modalInstance;
    vm.loading = true;


    vm.tab = 2;

    vm.set = function (checkTab) {
      return setTabsService.isSet(checkTab);
    };

    vm.tab = function (activeTab) {
      return setTabsService.setTab(activeTab);
    };

    vm.clear = function () {
      $scope.$broadcast('clickTab');
    };

    vm.slider = {
      options: {
        floor: 0,
        ceil: 370,
        showSelectionBarFromValue: 0
      }
    };


    $scope.$on('resetFilter', function () {
      if (angular.isDefined(vm.advSearch.maxdistance)) {
        vm.advSearch.maxdistance = 0;
      }

      if (angular.isDefined(vm.advSearch.region)) {
        delete vm.advSearch.region;
      }
    });

    vm.clearDistance = function () {
      if (angular.isDefined(vm.advSearch.maxdistance)) {
        vm.advSearch.maxdistance = 0;
      }
    };

    vm.selected_baselines = [];
    vm.selected_baseline_settings = {
      template: '<b>{{option.id}}</b>',
      enableSearch: true,
      styleActive: true
    };

    angular.forEach(vm.selected_baselines, function (value, index) {
      vm.advSearch.needs.push (value.id);
      $log.log(vm.advSearch.needs[0]);
    });

    $http({
      //url: 'http://10.15.66.88/CCWISRest/Placement/DropDownData',
      url: '/assets/api/getAdvancedOptions.json',
      method: 'GET',
      dataType: 'json',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function (response) {
      vm.advancedOptions = response.data;
      vm.regions = vm.advancedOptions['Regions'];
      // angular.forEach(structureData(vm.advancedOptions['Disabilities'][0]), function (value, index) {
      //   vm.disabilities.push({id: value.value, label: value.key});
      // });
      // $log.log(vm.disabilities);
      vm.disabilities = structureData(vm.advancedOptions['Disabilities'][0]);
      vm.services = structureData(vm.advancedOptions['ServiceTypes'][0]);
    }, function (error) {
      vm.status = error.status;
      $location.url('/error');
    }).finally(function () {
      vm.loading = false;
    });




    // $http.get('http://10.15.66.88/CCWISRest/Placement/DropDownData')
    //        .then(function(response){

    //             // if service returns the data in different form then
    //             // don't proces it further
    //             if (response.data && typeof response.data !== 'string') {
    //               return;
    //             }

    //             // convert stringified response to a valid JS object
    //             response.data = JSON.parse(JSON.stringify(response.data));

    //             vm.advancedOptions = response.data;
    //             vm.regions = vm.advancedOptions['Regions'];
    //             vm.disabilities = structureData(vm.advancedOptions['Disabilities'][0]);
    //             vm.serviceTypes = structureData(vm.advancedOptions['ServiceTypes'][0]);
    //         }, function (error) {
    //             vm.status = error.status;
    //             $location.url('/error');
    //        }).finally(function () {
    //             $scope.loading = false;
    //       });


    function structureData(arr) {
      if (!angular.isArray(arr)) {
        return [];
      }

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

    vm.onAdvanceSearch = function (e, data) {
      $scope.$broadcast('ADV_SEARCH_DATA', data);
    };


    angular.element(document).ready(function () {

      angular.element('#dismiss, .overlay, #apply').on('click', function () {
        angular.element('#sidebar').removeClass('active');
        angular.element('.overlay').fadeOut();
      });

      angular.element('#sidebarCollapse').on('click', function () {
        angular.element('#sidebar').addClass('active');
        angular.element('.overlay').fadeIn();
        angular.element('.collapse.in').toggleClass('in');
      });
    });

    angular.element(".rotate").click(function () {
      angular.element(this).toggleClass("down");
    });

    vm.open = function () {
      vm.modalInstance = $uibModal.open({
        templateUrl: 'app/components/business-rules/business-rules.html',
        controller: 'BusinessRulesController',
        controllerUrl: 'app/components/business-rules/business-rules.controller',
        controllerAs: 'rules'
      });
    };
  }

  /** @ngInject */
  // function BusinessRulesController($uibModalInstance, setTabsService) {
  //   var vm = this;

  //   //check tabs
  //   vm.set = function (checkTab) {
  //     return setTabsService.isSet(checkTab);
  //   };

  //   vm.ok = function () {
  //     $uibModalInstance.close();
  //   };

  //   vm.cancel = function () {
  //     $uibModalInstance.dismiss('cancel');
  //   };
  // }

})();

(function () {
  'use strict';

  angular
    .module('testProject')
    .directive('searchByName', searchByName);

  /** @ngInject */
  function searchByName() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/views/view.html',
      scope: {
        creationDate: '='
      },
      controller: searchByNameController,
      controllerAs: 'sbn',
      bindToController: true
    };

    return directive;


    /** @ngInject */
    function searchByNameController(getChildrenFactory, getWorkersFactory, getSiblingsFactory, $scope, $log, $http, $location, setTabsService) {
      var vm = this;

      vm.status;
      vm.exception;
      vm.noChildren;
      vm.uname;
      vm.caseId;
      vm.siblings;
      vm.children = [];
      vm.placements = [];
      vm.resource = [];
      vm.activeWorkers = [];
      $scope.childArray = [];
      $scope.addChildren;
      $scope.numChildren;
      $scope.loading = true;
      $scope.isCollapsed = false;

      $scope.gap = 5;
      //$scope.filteredItems = [];
      $scope.groupedItems = [];
      $scope.itemsPerPage = 0;
      $scope.pagedItems = [];
      $scope.currentPage = 0;
      $scope.filter = {};
      var selectedSiblings = [];

      vm.set = function (checkTab) {
        return setTabsService.isSet(checkTab);
      };

      vm.tab = function (activeTab) {
        return setTabsService.setTab(activeTab);
      };

      getWorkerDetails();

      function getWorkerDetails() {

        getWorkersFactory.getActiveWorkers()
          .then(function (response) {
            vm.activeWorkers = angular.fromJson(response.data);
            vm.getChildrenData();
          }, function (error) {
            vm.status = error.status;
            $location.url('/error');
          }).finally(function () {
            $scope.loading = false;
          });
      }

      vm.getChildrenData = function () {
        if (angular.isDefined($location.search().uname)) {
          vm.uname = $location.search().uname;
        } else if (angular.isDefined($scope.filter.user)) {
          $scope.filter.user === 'My Caseload' ? vm.uname = $location.search().uname :
            vm.uname = $scope.filter.user;
        } else {
          vm.uname = "all";
        }
        // if (angular.isUndefined($scope.filter.uname)) {
        //   $scope.filter.uname = "all";
        // }
        getChildrenFactory.getChildren(vm.uname)
          .then(function (response) {
            vm.children = angular.fromJson(response.data);
            //$log.log(response.data);
            if (vm.children.length === 0) {
              vm.noChildren = "No children exist under the selected worker";
            }
          }, function (error) {
            vm.status = error.status;
            $location.url('/error');
          }).finally(function () {
            $scope.loading = false;
          });
      };

      // if (angular.isUndefined($scope.selectedChild)) {
      //   return;
      // } else {
      //   vm.getSiblingData = function () {
      //     vm.caseId = $scope.selectedChild.originalObject.CaseId;
      //     getSiblingsFactory.getData(vm.caseId)
      //       .then(function (response) {
      //         vm.siblings = angular.fromJson(response.data);
      //         $log.log(response);
      //       }, function (error) {
      //         vm.status = error.status;
      //       }).finally(function () {
      //         $scope.loading = false;
      //       });
      //   };
      // }


      vm.clear = function () {
        $scope.$broadcast('angucomplete-alt:clearInput');
        $scope.$emit('resetFilter');
        $scope.isCollapsed = false;
        selectedSiblings = [];
        if (angular.isDefined($scope.selectedChild)) {
          $scope.selectedChild = {};
        }

        if (angular.isDefined($scope.filter.user || $location.search().uname)) {
          delete $scope.filter.user;
          vm.getChildrenData();
        }
        if (angular.isDefined(vm.exception)) {
          delete vm.exception;
        }
        if (angular.isDefined($scope.AddrLine2)) {
          delete $scope.AddrLine2;
        }
        if (angular.isDefined($scope.siblingsList)) {
          delete $scope.siblingsList;
        }
        if (angular.isDefined($scope.addChildren)) {
          $scope.addChildren = '';
        }
        if ($scope.pagedItems.length ) {
          $scope.pagedItems.length = !$scope.pagedItems.length;
        }
        $scope.searchForm.$setPristine();
      };

      $scope.$on('clickTab', function () {
        vm.clear();
      });

      // $scope.localSearch = function (str) {
      //   var matches = [];
      //   vm.children.forEach(function (person) {
      //     if ((person.First.toLowerCase().indexOf(str.toString().toLowerCase()) === 0) ||
      //       (person.Last.toLowerCase().indexOf(str.toString().toLowerCase()) === 0) ||
      //       (person.Name.toLowerCase().indexOf(str.toString().toLowerCase()) === 0)) {
      //       matches.push(person);
      //     }
      //   });
      //   return matches;
      // };

      vm.additionalChildren = function () {
        $scope.childArray.length = 0;
        for (var i = 0; i < parseInt($scope.addChildren || $scope.numChildren); i++) {
          $scope.childArray.push(i);
        }
      };

      vm.addSibling = function (id, sibling) {
        var idx = selectedSiblings.indexOf(sibling);
        if (idx == -1) {
          console.log('Pushing: ', sibling);
          selectedSiblings.push(sibling);
          console.log(selectedSiblings);
        } else {
          selectedSiblings.splice(idx, 1);
          console.log(selectedSiblings);
        }
      };

      vm.checkSelected = function (sibling) {
        var idx = selectedSiblings.indexOf(sibling);
        return idx > -1;
      };

      angular.element(".rotate-plus").click(function(){
        angular.element(this).toggleClass("down");
       });

      vm.search = function (data) {
        $scope.inputs = [];
        $scope.girlsAgeArray = [];
        $scope.boysAgeArray = [];
        $scope.infantGirlArray = [];
        $scope.infantBoyArray = [];
        $scope.infantCnt = 0;
        $scope.infantGirls;
        $scope.infantBoys;
        $scope.loading = true;

        $scope.childIdArray = [];
        $scope.childId = $scope.selectedChild.originalObject.PersonId;
        $scope.childIdArray.push($scope.childId);

        $scope.addressArray = [];
        $scope.address1 = $scope.selectedChild.originalObject.AddrLine1;
        $scope.addressArray.push($scope.address1);

        $scope.addressLine2 = [];
        $scope.address2 = $scope.AddrLine2;
        $scope.addressLine2.push($scope.address2);

        $scope.cityArray = [];
        $scope.city = $scope.selectedChild.originalObject.AddrCity;
        $scope.cityArray.push($scope.city);

        $scope.stateArray = [];
        $scope.state = $scope.selectedChild.originalObject.AddrState;
        $scope.stateArray.push($scope.state);

        $scope.zipArray = [];
        $scope.zip = $scope.selectedChild.originalObject.AddrZip;
        $scope.zipArray.push($scope.zip);

        $scope.distanceArray = [];
        if (data && Object.keys(data).length > 0) {
          $scope.distanceArray.push(data.maxdistance);
        }


        $scope.childArray.forEach(function (value) {

          var ageElement = angular.element('#age-' + value);
          var genderElement = angular.element('#gender-' + value);

          // var adtndetails = { Age: ageElement[0].value, Gender: genderElement[0].value};
          // $scope.inputs.push(adtndetails);

          if (genderElement[0].value == 'f') {
            $scope.girlsAgeArray.push(ageElement[0].value);
          } else if (genderElement[0].value == 'm') {
            $scope.boysAgeArray.push(ageElement[0].value);
          } else if (genderElement[0].value == 'ig') {
            $scope.infantCnt += 1;
            $scope.infantGirlArray.push($scope.infantCnt);
          } else {
            $scope.infantCnt += 1;
            $scope.infantBoyArray.push($scope.infantCnt);
          }
        }, this);

        angular.forEach(selectedSiblings, function (value, key) {
          if (value.Gen == "M" && value.Age > 18) {
            var ageOfBoy = value.Age / 12;
            if (Math.floor(ageOfBoy) < 2) {
              ageOfBoy = Math.ceil(ageOfBoy);
            } else {
              ageOfBoy = Math.floor(ageOfBoy);
            }
            $scope.boysAgeArray.push(ageOfBoy);
          } else if (value.Gen == "F" && value.Age > 18) {
            var ageOfGirl = value.Age / 12;
            if (Math.floor(ageOfGirl) < 2) {
              ageOfGirl = Math.ceil(ageOfGirl);
            } else {
              ageOfGirl = Math.floor(ageOfGirl);
            }
            $scope.girlsAgeArray.push(Math.floor(ageOfGirl));
          } else if (value.Gen == "M" && value.Age < 18) {
            $scope.infantCnt += 1;
            $scope.infantBoyArray.push($scope.infantCnt);
          } else {
            $scope.infantCnt += 1;
            $scope.infantGirlArray.push($scope.infantCnt);
          }
        });


        if ($scope.infantGirlArray.length) {
          $scope.infantGirls = $scope.infantGirlArray.length;
        } else {
          $scope.infantGirls = '';
        }

        if ($scope.infantBoyArray.length) {
          $scope.infantBoys = $scope.infantBoyArray.length;
        } else {
          $scope.infantBoys = '';
        }

        var dataToString = '';
        if (data && Object.keys(data).length > 0) {

          for (var i in data) {
            if (angular.isArray(data[i])) {
              var idx = 0;
              var multiSelect = '';

              while (idx < data[i].length) {
                var obj = data[i][idx];
                multiSelect += (obj.value + ',');

                idx++;
              }

              dataToString += ('&' + i + '=' + multiSelect);
            } else {
              dataToString += ('&' + i + '=' + (data[i] || ''));
            }
          }
        }


        //var url = 'http://10.160.96.42:8044/Placement/OptimizePlacement?ChildId='+$scope.inputs[0]+'&b=&g=&ig=&ib=';
        //var url = 'http://10.15.66.88/CCWISRest/Placement/OptimizePlacement?ChildId=&b=9&g=&ib=&ig=&address=700%20North%20St&city=Jackson&state=MS&zip=39211'

        //var searchUrl = 'http://10.15.66.88/CCWISRest/Placement/OptimizePlacement' + constructUrl(dataToString);
        var searchUrl = 'http://10.160.96.42:8044/Placement/OptimizePlacement' + constructUrl(dataToString);

        $http.get(searchUrl)
          .then(function (response) {
            if (response.data && typeof response.data !== 'string') {
              return;
            }
            vm.placements = angular.fromJson(response.data);
            if (angular.isArray(vm.placements['Results'])) {
              vm.resource = vm.placements['Results'];
              vm.groupToPages();
              if (vm.placements['Results'].length === 0) {
                vm.exception = "I am sorry, but there are no resource homes found under this distance. Please search again by increasing your distance in Advanced Search.";
              }
            } else {
              vm.exception = vm.placements.ERR;
            }
          }, function (error) {
            vm.status = error.status;
            $location.url('/error');
          }).finally(function () {
            $scope.loading = false;
          });
      };
      vm.priorAne = function (placement) {
        if (!placement || !!!placement.PriorAne) return;

        var __resourceType = placement.PriorAne.toLowerCase() == 'true' ?
          placement.ResourceType + '<br/> <span class="prior-ane">*Prior ANE</span>' :
          placement.ResourceType;
        return __resourceType;
      };

      function constructUrl(qString) {
        var url = '';
        var params = {
          'ChildId': $scope.childIdArray.toString(),
          'b': $scope.boysAgeArray.toString(),
          'g': $scope.girlsAgeArray.toString(),
          'ib': $scope.infantBoys,
          'ig': $scope.infantGirls,
          'address': $scope.addressArray.toString(),
          'line2': $scope.addressLine2.toString(),
          'city': $scope.cityArray.toString(),
          'state': $scope.stateArray.toString(),
          'zip': $scope.zipArray.toString()
        };

        var count = 0;
        for (var i in params) {
          params[i] = params[i] || '';

          // for the first query parameter add a question
          // mark to the end point
          if (count == 0) {
            url += '?' + i + '=' + params[i];
          } else {
            url += '&' + i + '=' + params[i];
          }

          count++;
        }
        return url + qString;
      }

      // //init sort
      //    $scope.sort = {
      //         sortingOrder : 'id',
      //         reverse : false
      //     };

      // //Calculate  Page nation
      // var searchMatch = function (haystack, needle) {
      //   if (!needle) {
      //       return true;
      //   }
      //   return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
      // };
      // vm.searchTable = function () {
      //   $scope.filteredItems = $filter('filter')(vm.placements, function (placement) {
      //       for(var attr in placement) {
      //           if (searchMatch(placement[attr], $scope.query))
      //               return true;
      //       }
      //       return false;
      //   });
      //     //take care of the sorting orderz
      //   if ($scope.sort.sortingOrder !== '') {
      //       $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
      //   }
      //   $scope.currentPage = 0;
      //   // now group by pages
      //   vm.groupToPages();
      // };


      // calculate page in place
      vm.groupToPages = function () {
        $scope.pagedItems = [];
        $scope.itemsPerPage = $scope.entriesPerPage;
        for (var i = 0; i < vm.resource.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [vm.resource[i]];
          } else {
            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push(vm.resource[i]);
          }
        }
      };

      $scope.$on('ADV_SEARCH_DATA', function (e, data) {
        vm.search(data);
        vm.onClick(0);
      });

      vm.range = function (size, start, end) {
        var ret = [];

        if (size < $scope.gap) {
          end = size;
          start = 0;
        } else if (size < end) {
          end = size;
          start = size - $scope.gap;
        }
        for (var i = start; i < end; i++) {
          ret.push(i);
        }
        return ret;

      };

      vm.firstPage = function () {
        if ($scope.currentPage > 0) {
          $scope.currentPage -= $scope.currentPage;
        }
      };

      vm.lastPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
          $scope.currentPage += ($scope.pagedItems.length - 1) - $scope.currentPage;
        }
      };

      vm.prevPage = function () {
        if ($scope.currentPage > 0) {
          $scope.currentPage--;
        }
      };

      vm.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
          $scope.currentPage++;
        }
      };

      vm.setPage = function (page) {

        // if ($scope.currentPage <  $scope.pagedItems.length - 1) {
        //   $scope.currentPage = page;
        // } else {
        //   $scope.currentPage = 0;
        // }
        $scope.currentPage < $scope.pagedItems.length ? $scope.currentPage = page : $scope.currentPage = 0;
      };
      vm.onClick = function (page) {
        $scope.currentPage = page;
      };

      // functions have been describe process the data for display
      vm.groupToPages();

    }
  }
})();

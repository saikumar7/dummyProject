(function() {

  "use strict";

  angular
    .module("placementMatchingTool")
    .directive("searchByName", searchByName);

  /** @ngInject */
  function searchByName() {
    var directive = {
      restrict: "E",
      templateUrl: "app/components/views/view.html",
      scope: {
        creationDate: "="
      },
      controller: searchByNameController,
      controllerAs: "sbn",
      bindToController: true
    };
    return directive;

    /** @ngInject */
    function searchByNameController(getChildrenFactory,
      $scope, $location, $http) {
      var vm = this;

      vm.status;
      vm.children = [];
      vm.placements = [];

      $scope.childArray = [];
      $scope.addChildren;
      $scope.loading = true;

      $scope.gap = 5;
      $scope.groupedItems = [];
      $scope.itemsPerPage = 0;
      $scope.pagedItems = [];
      $scope.currentPage = 0;

      //get currentPlacements from server
      getChildrenData();
      function getChildrenData() {
        getChildrenFactory
          .getChildren()
          .then(
            function(response) {
              vm.children = angular.fromJson(response.data);
            },
            function(error) {
              vm.status = error.status;
              $location.url("/error");
            }
          )
          .finally(function() {
            $scope.loading = false;
          });
      }

      // display age and gender fields dynamically
      vm.additionalChildren = function() {
        $scope.childArray.length = 0;
        for (var i = 0; i < parseInt($scope.addChildren); i++) {
          $scope.childArray.push(i);
        }
      };

      vm.clear = function() {
        $scope.$broadcast("angucomplete-alt:clearInput");
        $scope.addChildren = "";
      };

      $scope.localSearch = function(str) {
        var matches = [];
        vm.children.forEach(function(person) {
          if (
            person.FirstName
              .toLowerCase()
              .indexOf(str.toString().toLowerCase()) === 0 ||
            person.LastName
              .toLowerCase()
              .indexOf(str.toString().toLowerCase()) === 0 ||
            person.FullName
              .toLowerCase()
              .indexOf(str.toString().toLowerCase()) === 0
          ) {
            matches.push(person);
          }
        });
        return matches;
      };

      vm.search = function() {
        $scope.childIdArray = [];
        $scope.childId = $scope.selectedChild.originalObject.PersonId;
        $scope.childIdArray.push($scope.childId);

        $scope.inputs = [];
        $scope.girlsAgeArray = [];
        $scope.boysAgeArray = [];
        $scope.infantGirlArray = [];
        $scope.infantBoyArray = [];
        $scope.infantCnt = 0;
        $scope.infantGirls;
        $scope.infantBoys;
        $scope.loading = true;

        //loop dynamically entered values in additional children field
        $scope.childArray.forEach(function(value, key) {
          var ageElement = angular.element("#age-" + value);
          var genderElement = angular.element("#gender-" + value);

          if (genderElement[0].value == "f") {
            $scope.girlsAgeArray.push(ageElement[0].value);
          } else if (genderElement[0].value == "m") {
            $scope.boysAgeArray.push(ageElement[0].value);
          } else if (genderElement[0].value == "ig") {
            $scope.infantCnt += 1;
            $scope.infantGirlArray.push($scope.infantCnt);
          } else {
            $scope.infantCnt += 1;
            $scope.infantBoyArray.push($scope.infantCnt);
          }
        }, this);

        if ($scope.infantGirlArray.length) {
          $scope.infantGirls = $scope.infantGirlArray.length;
        } else {
          $scope.infantGirls = "";
        }

        if ($scope.infantBoyArray.length) {
          $scope.infantBoys = $scope.infantBoyArray.length;
        } else {
          $scope.infantBoys = "";
        }

        //Receive results of resource homes from server by sending search values to server
        $http
          .get("http://10.15.66.88/CCWISRest/Placement/OptimizePlacement", {
            params: {
              ChildId: $scope.childIdArray[0],
              b: $scope.boysAgeArray.toString(),
              g: $scope.girlsAgeArray.toString(),
              ib: $scope.infantBoys,
              ig: $scope.infantGirls
            }
          })
          .then(
            function(response) {
              vm.placements = angular.fromJson(response.data);
              vm.groupToPages();
            },
            function(error) {
              vm.status = error.status;
              $location.url("/error");
            }
          )
          .finally(function() {
            $scope.loading = false;
          });
      };

      // calculate pagination in place
      vm.groupToPages = function() {
        $scope.pagedItems = [];
        $scope.itemsPerPage = $scope.entriesPerPage;
        for (var i = 0; i < vm.placements.length; i++) {
          if (i % $scope.itemsPerPage === 0) {
            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [
              vm.placements[i]
            ];
          } else {
            $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push(
              vm.placements[i]
            );
          }
        }
      };

      vm.range = function(size, start, end) {
        var ret = [];

        if (size < end) {
          end = size;
        }
        for (var i = start; i < end; i++) {
          ret.push(i);
        }
        return ret;
      };

      vm.firstPage = function() {
        if ($scope.currentPage > 0) {
          $scope.currentPage -= $scope.currentPage;
        }
      };

      vm.lastPage = function() {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
          $scope.currentPage +=
            $scope.pagedItems.length - 1 - $scope.currentPage;
        }
      };

      vm.prevPage = function() {
        if ($scope.currentPage > 0) {
          $scope.currentPage--;
        }
      };

      vm.nextPage = function() {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
          $scope.currentPage++;
        }
      };

      vm.setPage = function(page) {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
          $scope.currentPage = page;
        } else {
          $scope.currentPage = 0;
        }
      };

      // functions have been describe process the data for display
      vm.groupToPages();
    }
  }
})();

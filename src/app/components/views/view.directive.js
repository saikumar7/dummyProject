(function() {
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
    function searchByNameController(getChildrenFactory, $scope, $log, $http, $location, setTabsService) {
    var vm = this;

    vm.status;
    vm.children = [];
    vm.placements = [];
    vm.resource =[];
    $scope.childArray = [];
    $scope.addChildren;
    $scope.loading = true;

    $scope.gap = 5;
    //$scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 0;   
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    vm.Set = function(checkTab) {
      return setTabsService.isSet(checkTab);
    };

    vm.Tab = function(activeTab) {
      return setTabsService.setTab(activeTab);
    };
  
    getChildrenData();
    function getChildrenData() {
      getChildrenFactory.getChildren()
          .then(function (response) {
              vm.children = angular.fromJson(response.data);
          }, function (error) {
              vm.status = error.status;              
              $location.url('/error');
          }).finally(function () {
             $scope.loading = false;
          });         
        }
      vm.clear = function () {
        $scope.$broadcast('angucomplete-alt:clearInput');
        $scope.addChildren = '';
        if ($scope.pagedItems.length) {
            $scope.pagedItems.length = !$scope.pagedItems.length;
        } 

      }

     $scope.localSearch = function(str) {
      var matches = [];
      vm.children.forEach(function(person) {
        if ((person.FirstName.toLowerCase().indexOf(str.toString().toLowerCase()) === 0) ||
            (person.LastName.toLowerCase().indexOf(str.toString().toLowerCase()) === 0) ||
            (person.FullName.toLowerCase().indexOf(str.toString().toLowerCase()) === 0)) {
          matches.push(person);
        }
      });
      return matches;
    };

    vm.additionalChildren = function () {
       //vm.number = vm.addChildren;
       //vm.testArray.push(addChildren);

      // return new Array(addChildren); 

      $scope.childArray.length = 0;     
      for (var i = 0; i < parseInt($scope.addChildren); i++) {               
                    $scope.childArray.push(i);
                }     
        }


        vm.search = function () {
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

          $scope.cityArray = [];
          $scope.city = $scope.selectedChild.originalObject.AddrCity;
          $scope.cityArray.push($scope.city);

          $scope.stateArray = [];
          $scope.state = $scope.selectedChild.originalObject.AddrState;
          $scope.stateArray.push($scope.state);

          $scope.zipArray = [];
          $scope.zip = $scope.selectedChild.originalObject.AddrZip;
          $scope.zipArray.push($scope.zip);

 
          $scope.childArray.forEach(function(value, key) {
           
            var ageElement = angular.element('#age-' + value);
            var genderElement = angular.element('#gender-' + value);
            
            // var adtndetails = { Age: ageElement[0].value, Gender: genderElement[0].value};
            // $scope.inputs.push(adtndetails);
                                
              if (genderElement[0].value == 'f') {
                  $scope.girlsAgeArray.push(ageElement[0].value);  
              } else if (genderElement[0].value == 'm') {
                  $scope.boysAgeArray.push(ageElement[0].value);                    
              } else if(genderElement[0].value == 'ig'){
                  $scope.infantCnt += 1
                  $scope.infantGirlArray.push($scope.infantCnt);
              } else {
                  $scope.infantCnt += 1
                  $scope.infantBoyArray.push($scope.infantCnt);
              }
          }, this);


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

           //var url = 'http://10.160.96.42:8044/Placement/OptimizePlacement?ChildId='+$scope.inputs[0]+'&b=&g=&ig=&ib=';
           //var url = 'http://10.15.66.88/CCWISRest/Placement/OptimizePlacement?ChildId=&b=9&g=&ib=&ig=&address=700%20North%20St&city=Jackson&state=MS&zip=39211'

          $http.get('http://10.15.66.88/CCWISRest/Placement/OptimizePlacement', {params:{'ChildId': $scope.childIdArray.toString(), 'b': $scope.boysAgeArray.toString(), 
            'g': $scope.girlsAgeArray.toString(), 'ib': $scope.infantBoys, 'ig': $scope.infantGirls, 'address': $scope.addressArray.toString(), 
            'city': $scope.cityArray.toString(), 'state': $scope.stateArray.toString(), 'zip': $scope.zipArray.toString()}})
          .then(function(response){
             vm.placements = angular.fromJson(response.data);
             vm.resource = vm.placements['Results'];
             $log.log(response.data);
             vm.groupToPages();
            }, function (error) {
               vm.status = error.status;              
               $location.url('/error');
           }).finally(function () {
             $scope.loading = false;
          });
          // $http({
          //     url: 'http://10.15.66.88/CCWISRest/Placement/OptimizePlacement?',
          //     method: "GET",
          //     params:{'ChildId': $scope.childIdArray[0], 'b': $scope.boysAgeArray.toString(), 'g': $scope.girlsAgeArray.toString(), 'ib': $scope.infantBoys, 'ig': $scope.infantGirls}
          //  }).then(function(response){
          //      vm.placements = angular.fromJson(response.data);
          //      $log.log(vm.placements);
          //      vm.groupToPages();
          //  }, function (error) {
          //      vm.status = error.status;              
          //      $location.url('/error');
          //  }).finally(function () {
          //    $scope.loading = false;
          // });

        }
      vm.priorAne = function(placement) {
          if (!placement || !!!placement.PriorAne) return;
          
          var __resourceType = placement.PriorAne.toLowerCase() == 'true'
                                              ?  placement.ResourceType + ' Prior ANE*'
                                               : placement.ResourceType;
          return __resourceType;
      };

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
            for (var i = 0; i <  vm.resource.length; i++) {
                if (i % $scope.itemsPerPage === 0) {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [vm.resource[i]];
                } else {
                    $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push( vm.resource[i]);
                }
            }
        };
   
        vm.range = function (size,start, end) {
            var ret = [];        

            if (size < $scope.gap) {
                end = size;
                start = 0;
            }
            else if (size < end) {
                end = size;
                start = size-$scope.gap;
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
        }

        vm.lastPage = function () {
          if ($scope.currentPage < $scope.pagedItems.length - 1) {
          $scope.currentPage += ($scope.pagedItems.length - 1)-$scope.currentPage;
         }
        }
    
    
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

          if ($scope.currentPage < $scope.pagedItems.length - 1) {   
            $scope.currentPage = page;
          }
          else {
            $scope.currentPage = 0;
          }
        };
        vm.onClick = function(page) {
            $scope.currentPage = page;
        }

        // functions have been describe process the data for display
      vm.groupToPages();

      }
    }
})();


(function() {
  'use strict';

  angular
    .module('placementMatchingTool')
    .controller('MainController', MainController);
    
    
   /** @ngInject */
   function MainController () {
    // var vm = this;
    // vm.status;
    // vm.children = [];

    
    // getChildrenData(); 
    // function getChildrenData() {
    //   dataFactory.getChildren()
    //       .then(function (response) {
    //           vm.children = angular.fromJson(response.data);
    //       }, function (error) {
    //           vm.status = 'Unable to load children data: ' + error.message;
    //       });         
    // }
   
    
    // vm.updateChild = function (id) {
    //   var child;
    //   for (var i = 0; i < vm.children.length; i++) {
    //       var currChild = vm.children[i];
    //       if (currChild.ID === id) {
    //         child = currChild;
    //           break;
    //       }
    //   }

    //    dataFactory.updateChild(child)
    //     .then(function (response) {
    //         vm.status = 'Updated child! Refreshing children list.';
    //     }, function (error) {
    //         vm.status = 'Unable to update child: ' + error.message;
    //     });
    // };

    // vm.insertChild = function () {
    //   //Fake customer data
    //   var child = {
    //       id: 25,
    //       title: 'JoJo',
    //       body: 'Pikidily'
    //   };
    //   dataFactory.insertChild(child)
    //       .then(function (response) {
    //         vm.status = 'Inserted child! Refreshing children list.';
    //         vm.children.push(child);
    //       }, function(error) {
    //           vm.status = 'Unable to insert child: ' + error.message;
    //       });
    // };
   } 
 
})();

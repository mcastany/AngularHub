'use strict';

//var listOfEntries = [];

//for (var j = 0; j < 5; j++) {
//    var subelements = [];
//    for (var i = 0; i < 5; i++) {
//        var subelements2 = [];
//        for (var k = 0; k < 5; k++) {
//            subelements2.push({
//                name: "Sub-Sub-Element" + k,
//                elements: []
//            });
//        }
//        subelements.push({
//            name: "Sub-Element" + i,
//            elements: subelements2
//        });
//    }

//    listOfEntries.push({
//        name: "Element" + j,
//        elements: subelements
//    });
//}

//var node = {
//    name: "Master",
//    elements: listOfEntries
//};

angular.module('hubApp')
  .controller('MainCtrl', function ($scope) {
   
      //$scope.menu = node;
      var open = false;
      document.querySelector('button').addEventListener("click", function () {
          var valMenu = '',
              valContainer = '';
          if (!open) {
              valContainer = 'translate(300px,0)';
              //valMenu = 'translate(-100%,0)';
          } else {
              valMenu = 'translate(0,0)';
              //valContainer = 'translate(0,0)';
          }
          
          //document.querySelector('.menu').style.WebkitTransform = valMenu;
          //document.querySelector('.menu').style.MozTransform = valMenu;
          //document.querySelector('.menu').style.transform = valMenu;
          
          document.querySelector('.sub-container').style.WebkitTransform = valContainer;
          document.querySelector('.sub-container').style.MozTransform = valContainer;
          document.querySelector('.sub-container').style.transform = valContainer;
          open = !open;
      });
  });

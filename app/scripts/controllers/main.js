'use strict';

var listOfEntries = [];

for (var j = 0; j < 5; j++) {
    var subelements = [];
    for (var i = 0; i < 5; i++) {
        var subelements2 = [];
        for (var k = 0; k < 5; k++) {
            subelements2.push({
                name: "Sub-Sub-Element" + k,
                elements: []
            });
        }
        subelements.push({
            name: "Sub-Element" + i,
            elements: subelements2
        });
    }

    listOfEntries.push({
        name: "Element" + j,
        elements: subelements
    });
}

var node = {
    name: "Master",
    elements: listOfEntries
};

angular.module('hubApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.menu = node;
  });

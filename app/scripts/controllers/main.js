'use strict';

var listOfEntries = [];

for (var j = 0; j < 5; j++) {
    var subelements = [];
    for (var i = 0; i < 5; i++) {
        var subelements2 = [];
        for (var k = 0; k < 5; k++) {
            subelements2.push({ name: "Sub-Sub-Element" + k, elements: [] });
        }
        subelements.push({ name: "Sub-Element" + i, elements: subelements2 });
    }
    listOfEntries.push({ name: "Element" + j, elements: subelements });
}

var node = { name: "Master", elements: listOfEntries };

angular.module('hubApp').controller('MainCtrl', function ($scope) {
    $scope.menu = node;

    var open = false,
        initialWith = 300;

    document.querySelector('button.opener').addEventListener("click", function () {
        var valContainer = '';

        if (!open) {
            valContainer = 'translate(' + initialWith + 'px,0)';
        } else {
            valContainer = 'translate(0,0)';
        }

        document.querySelector('.container').style.WebkitTransform = valContainer;
        document.querySelector('.container').style.MozTransform = valContainer;
        document.querySelector('.container').style.transform = valContainer;
        open = !open;
    });
});

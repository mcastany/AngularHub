'use strict';


angular.module('hubApp')
  .directive('menu', function ($compile) {
      return {
          restrict: 'E',
          terminal: true,
          scope: {
              menulist: '=',
              identifier: '='
          },
          controller: function ($scope) {
              $scope.open = function (e, v) {
                  var elem = angular.element(e.srcElement);
                  alert("Clicked an element");
              };

              $scope.back = function (e, v) {
                  var elem = angular.element(e.srcElement);
                  alert("Clicked back button");
              };
          },
          link: function (scope, element, attrs) {
              var template = '<div  class="menu-container {{identifier}}">' +
                      '<h2 class="icon icon-display">' +
                        scope.menulist.name +
                      '</h2>';

              if (angular.isArray(scope.menulist.elements)) {
                  template += '<a class="mp-back" ng-click="back($event)">Back</a>' +
                          '<ul>' +
                              '<li class="icon icon-arrow-left" ng-repeat="val in menulist.elements">' +
                              '<a ng-click="open($event, val.name)">{{val.name}}</a>' +
                                 '<menu menulist="val" identifier="val.name"></menu>' +
                              '</li>' +
                          '</ul>';
              }
              template += '</div>';

              var newElement = angular.element(template);
              $compile(newElement)(scope);
              element.replaceWith(newElement);
          }
      };
  });
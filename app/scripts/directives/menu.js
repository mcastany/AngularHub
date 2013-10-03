'use strict';


angular.module('hubApp')
  .directive('menu', function ($compile) {
      return {
          restrict: 'E',
          terminal: true,
          scope: {
              menulist: '=',
              parent: '='
          },
          link: function postLink(scope, element, attrs) {
              var template =
                  '<div  class="mp-level">' +
                    '<h2 class="icon icon-display">' +
                      scope.menulist.name +
                    '</h2>' +
                    '<a class="mp-back" href="#">back</a>';
              
              if (angular.isArray(scope.menulist.elements)) {
                  template +=
                      '<ul>' +
                          '<li class="icon icon-arrow-left" ng-repeat="val in menulist.elements">{{val.name}}' +
                            '<menu menulist="val" parent="menulist" ></menu>' +
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
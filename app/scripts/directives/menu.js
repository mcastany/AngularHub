'use strict';


angular.module('hubApp')
  .directive('menu', function ($compile) {
      return {
          restrict: 'E',
          terminal: true,
          scope: {
              menulist: '='
          },
          link: function postLink(scope, element, attrs) {
              var template = '<div>';
              
              if (angular.isArray(scope.menulist.elements)) {
                  template += '<ul>' +
                      '<li ng-repeat="val in menulist.elements">{{val.name}}' +
                      '<menu menulist="val"></menu>' +
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
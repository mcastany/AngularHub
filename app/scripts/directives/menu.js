'use strict';


angular.module('hubApp').directive('menu', function ($compile) {
    return {
        restrict: 'E',
        replace: true,
        terminal: true,
        scope: {
            menulist: '=',
            identifier: '=',
            level: "=",
            trigger: "="
        },
        controller: function ($scope) {
            var open = false,
                initialValue = 300,
                indent = 40,
                container = $('.container'),
                body = $('body');

            var bodyFunction = function (e) {
                e.preventDefault();
                e.stopPropagation();
                open = false;
                updateStyles(container, 0);
                body.off('click', bodyFunction);
            };


            if ($scope.trigger) {
                $($scope.trigger).on('click', function (ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    var valContainer = initialValue;
                    if (open) {
                        valContainer = 0;
                    }

                    $('nav > .menu-level').addClass('menu-overlaped')

                    body.on('click', bodyFunction);
                    updateStyles(container, valContainer);
                    updateStyles($('.menu-level[data-level=0]'), 0);
                    open = !open;
                });
            }

            var updateStyles = function (container, val) {
                container.css("-webkit-transform", 'translate(' + val + 'px,0)');
                container.css("-moz-transform", 'translate(' + val + 'px,0)');
                container.css("-ms-transform", 'translate(' + val + 'px,0)');
                container.css("-o-transform", 'translate(' + val + 'px,0)');
                container.css("transform", 'translate(' + val + 'px,0)');
            };

            $scope.open = function (event, name, level) {
                var divE = $(event.currentTarget).parent().find('.' + name),
                    valContainer = initialValue + level * indent;

                event.preventDefault();
                event.stopPropagation();

                updateStyles(container, valContainer);
                divE.addClass('menu-overlaped');
                divE.css("-webkit-transform", '');
                divE.css("-moz-transform", '');
                divE.css("-ms-transform", '');
                divE.css("-o-transform", '');
                divE.css("transform", '');

                //We need to move the elements that are hidden more to the left
                $('.menu-level').each(function (index, item) {
                    if (
                        $(item).data('level') > level ||
                        ($(item).data('level') == level && !item.classList.contains(name)) ||
                        ($(item).data('level') < level && !item.classList.contains("menu-overlaped"))
                        ) {
                        //We need to check the level and if the same value
                        $(item).css("-webkit-transform", 'translate(-100%, 0) translate(-' + indent * level + 'px, 0)');
                        $(item).css("-moz-transform", 'translate(-100%, 0) translate(-' + indent * level + 'px, 0)');
                        $(item).css("-ms-transform", 'translate(-100%, 0) translate(-' + indent * level + 'px, 0)');
                        $(item).css("-o-transform", 'translate(-100%, 0) translate(-' + indent * level + 'px, 0)');
                        $(item).css("transform", 'translate(-100%, 0) translate(-' + indent * level + 'px, 0)');
                    } 
                });
            };

            $scope.back = function (event, level) {
                var divE = $(event.currentTarget).parent(),
                    valContainer = initialValue + (level - 1) * indent;

                event.preventDefault();
                event.stopPropagation();

                divE.removeClass('menu-overlaped');

                if (level == 0) {
                    updateStyles(container, 0);
                    body.off('click', bodyFunction);
                    open = false;
                } else {
                    updateStyles(container, valContainer);
                }
            };


        },
        link: function (scope, element, attrs) {
            var level = scope.level || 0,
                template = '<div  class="menu-level {{identifier}}" data-level="' + level + '">' +
                    '<h2 class="icon icon-display">' +
                      scope.menulist.name +
                    '</h2>';

            if (angular.isArray(scope.menulist.elements)) {
                level++;
                template += '<a class="mp-back" ng-click="back($event, ' + (level - 1) + ', identifier)">Back</a>' +
                        '<ul>' +
                            '<li class="icon icon-arrow-left" ng-repeat="val in menulist.elements">' +
                            '<a ng-click="open($event, val.name, ' + level + ')">{{val.name}}</a>' +
                               '<menu menulist="val" identifier="val.name" level="' + level + '"></menu>' +
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
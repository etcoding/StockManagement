/// <reference path="../dts/angular-1.0.d.ts" />

angular.module('directives', [])
     .directive('alertTbs', function ($timeout: ng.ITimeoutService) {
         var dir = {
             restrict: 'AE',
             replace: true,
             scope: { messageData: '=messageData' },
             template: '<div class="alert alert-{{messageData.type}}">' +
                        '<button type="button" id="btnClose" class="close" data-ng-click="btnClose_Click()">x</button>' +
                        '<strong>{{messageData.header}}</strong> {{messageData.message}}' +
                        '</div>',
             link: function (scope, iElement, attrs, controller) {
                 scope.btnClose_Click = function () {
                     scope.messageData = null;
                 }

                 if (attrs.hideIn != undefined) {
                     var delay = parseInt(attrs.hideIn);
                     if (!isNaN(delay)) {
                         delay *= 1000;
                         scope.$watch('messageData', function () {
                             $timeout(function () {
                                 scope.messageData = null;
                             }, delay, true);
                         });
                     }
                 }
             }
         };

         return dir;
     });
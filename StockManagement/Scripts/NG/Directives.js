angular.module('directives', []).directive('alertTbs', function ($timeout) {
    var dir = {
        restrict: 'AE',
        replace: true,
        scope: {
            messageData: '=messageData'
        },
        templateUrl: '/Content/NG-DirectiveTemplates/alertTbs.html',
        link: function (scope, iElement, attrs, controller) {
            scope.btnClose_Click = function () {
                scope.messageData = null;
            };
            if(attrs.hideIn != undefined) {
                var delay = parseInt(attrs.hideIn);
                if(!isNaN(delay)) {
                    console.log("Delay is ", delay);
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

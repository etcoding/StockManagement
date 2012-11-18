/// <reference path="../AngularTS/angular.d.ts" />

class IndexController {
    constructor (private $scope: any, private $location: any) {
        $scope.currentPath = $location.path();


        $scope.$watch(function () { return $location.path() }, function () {
            $scope.currentPath = $location.path();
        });
    }

}
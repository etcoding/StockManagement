var IndexController = (function () {
    function IndexController($scope, $location) {
        this.$scope = $scope;
        this.$location = $location;
        $scope.currentPath = $location.path();
        $scope.$watch(function () {
            return $location.path();
        }, function () {
            $scope.currentPath = $location.path();
        });
    }
    return IndexController;
})();

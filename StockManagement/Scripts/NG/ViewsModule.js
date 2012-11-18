angular.module('views', []).config([
    '$routeProvider', 
    function ($routeProvider) {
        $routeProvider.when('/products', {
            templateUrl: '/Content/NG-Views/products.html',
            controller: Product.Controller
        }).when('/categories', {
            templateUrl: '/Content/NG-Views/categories.html',
            controller: Category.Controller
        }).when('/stores', {
            templateUrl: '/Content/NG-Views/stores.html',
            controller: Store.Controller
        }).otherwise({
            redirectTo: '/stores'
        });
    }]);

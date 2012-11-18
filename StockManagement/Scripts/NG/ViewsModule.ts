/// <reference path="../dts/angular-1.0.d.ts" />
/// <reference path="Category/Controller.ts" />
/// <reference path="Product/Controller.ts" />
/// <reference path="Store/Controller.ts" />

angular.module('views', []).
  config(['$routeProvider', function ($routeProvider : ng.IRouteProviderProvider) {
      $routeProvider.
          when('/products', { templateUrl: '/Content/NG-Views/products.html', controller: Product.Controller }).
          when('/categories', { templateUrl: '/Content/NG-Views/categories.html', controller: Category.Controller }).
          when('/stores', { templateUrl: '/Content/NG-Views/stores.html', controller: Store.Controller }).
          otherwise({ redirectTo: '/stores' });
  }]);


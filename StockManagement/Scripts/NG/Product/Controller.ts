/// <reference path="../../dts/angular-1.0.d.ts" />
/// <reference path="../../dts/angular-resource-1.0.d.ts" />
/// <reference path="IProductScope.ts" />
/// <reference path="ProductModel.ts" />
/// <reference path="CategoryModelCheckable.ts" />
/// <reference path="Service.ts" />
/// <reference path="../Category/Service.ts" />
/// <reference path="../../dts/sugar-1.3.d.ts" />

module Product {
    export  class Controller {
        static service: Service;
        static categoryService: Category.Service;
        static scope: IProductScope;

        constructor ($scope: IProductScope, $resource: ng.resource.IResourceService) {
            if (Controller.service == null)
                Controller.service = new Service($resource);
            if (Controller.scope == null)
                Controller.scope = $scope;

            if (Controller.categoryService == null)
                Controller.categoryService = new Category.Service($resource);

            this.SetupScope($scope);
            Controller.GetAll();
        }

        static Create(Product: ProductModel) {
            return service.Create(Product,
             function (newProduct: ProductModel) {  // success
                 Controller.scope.ProductsList.add(newProduct);
                 Controller.scope.Product = null;
                 Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Product saved", ResultMessageTypes.Success);
             },
             function (reason) {  // failure
                 Controller.scope.OperationResultMessage = new OperationResultMessage("Oops", "Failed to save new Product", ResultMessageTypes.Error);
             });
        }

        static GetAll() {
            return service.GetAll(null,
                function (products: ProductModel[]) {
                    Controller.scope.ProductsList = products;
                }, function (reason: any) {
                    Controller.scope.OperationResultMessage = new OperationResultMessage("Oops", "Failed to retrieve products", ResultMessageTypes.Error);
                    console.log("Failed to get all products, reason: ", reason);
                });
        }

        static Get(id: string) {
            return service.Get(id, function (Product: any) {
            }, function (reason: any) {
            });
        }

        static Update(Product: ProductModel) {
            return service.Update(Product,
                function (Product: ProductModel) {
                    Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Product updated", ResultMessageTypes.Success);
                },
                function (errData: any) {
                    Controller.scope.OperationResultMessage = new OperationResultMessage("Oops!", "Failed to update Product", ResultMessageTypes.Error);
                    console.log(errData);
                });
        }

        static Delete(Product: ProductModel) {
            Controller.service.Delete(Product, function () {
                console.log("deleted", Product);
                Controller.scope.ProductsList.remove(function (c: ProductModel) { return c.Id == Product.Id });
                Controller.scope.Product = null;
                Controller.scope.CategoriesList.forEach(function (c: CategoryModelCheckable) { c.Checked = false; });
                Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Product deleted", ResultMessageTypes.Success);
            },
                 function (error) {
                     Controller.scope.OperationResultMessage = new OperationResultMessage("Oops!", "Failed to delete product", ResultMessageTypes.Error);
                     console.log("Failed to delete", Product, error);
                 });
        }

        SetupScope(scope: IProductScope) {

            scope.Labels = {};
            scope.Labels.btnSave = "Create";
            scope.OperationResultMessage = null;

            // load all categories
            Controller.categoryService.GetAll(null,
                function (categories) {
                    scope.CategoriesList = categories;
                },
                function (reason) {
                    scope.OperationResultMessage = new OperationResultMessage("Oops", "Failed to load a list of categories", ResultMessageTypes.Error);
                    console.log("Failed to load categories: ", reason);
                });


            scope.$watch(function (s: IProductScope) { return s.Product; },
                function (n: any, o: any, scope: IProductScope) {
                    scope.Product && scope.Product.Id ? scope.Labels.btnSave = "Update" : scope.Labels.btnSave = "Create";
                });

            scope.SelectProductForUpdate = function (product: ProductModel) {
                console.log("setting Product for update", product);
                scope.Product = product;

                scope.CategoriesList.forEach(function (c: CategoryModelCheckable) {
                    if (product.Categories == null)
                        c.Checked = false;
                    else {
                        if (product.Categories.some(function (p: Category.CategoryModel) { return c.Id == p.Id; }))
                            c.Checked = true;
                        else
                            c.Checked = false;
                    }
                });
            }

            scope.btnSave_Click = function () {
                var categories = scope.CategoriesList.findAll(function (c: CategoryModelCheckable) { return c.Checked == true; });
                scope.Product.Categories = categories;
                console.log("Saving a product: ", scope.Product);
                if (scope.Product.Id != null) {
                    Controller.Update(scope.Product);
                }
                else {
                    Controller.Create(scope.Product);
                }
            }

            scope.btnDelete_Click = function () {
                Controller.Delete(scope.Product);
            }

            scope.btnClear_Click = function () {
                scope.Product = null;
                scope.CategoriesList.forEach(function (c: CategoryModelCheckable) { c.Checked = false; });
            }
        }
    }
}
var Product;
(function (Product) {
    var Controller = (function () {
        function Controller($scope, $resource) {
            if(Controller.service == null) {
                Controller.service = new Product.Service($resource);
            }
            if(Controller.scope == null) {
                Controller.scope = $scope;
            }
            if(Controller.categoryService == null) {
                Controller.categoryService = new Category.Service($resource);
            }
            this.SetupScope($scope);
            Controller.GetAll();
        }
        Controller.service = null;
        Controller.categoryService = null;
        Controller.scope = null;
        Controller.Create = function Create(Product) {
            return Controller.service.Create(Product, function (newProduct) {
                Controller.scope.ProductsList.add(newProduct);
                Controller.scope.Product = null;
                Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Product saved", ResultMessageTypes.Success);
            }, function (reason) {
                Controller.scope.OperationResultMessage = new OperationResultMessage("Oops", "Failed to save new Product", ResultMessageTypes.Error);
            });
        }
        Controller.GetAll = function GetAll() {
            return Controller.service.GetAll(null, function (products) {
                Controller.scope.ProductsList = products;
            }, function (reason) {
                Controller.scope.OperationResultMessage = new OperationResultMessage("Oops", "Failed to retrieve products", ResultMessageTypes.Error);
                console.log("Failed to get all products, reason: ", reason);
            });
        }
        Controller.Get = function Get(id) {
            return Controller.service.Get(id, function (Product) {
            }, function (reason) {
            });
        }
        Controller.Update = function Update(Product) {
            return Controller.service.Update(Product, function (Product) {
                Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Product updated", ResultMessageTypes.Success);
            }, function (errData) {
                Controller.scope.OperationResultMessage = new OperationResultMessage("Oops!", "Failed to update Product", ResultMessageTypes.Error);
                console.log(errData);
            });
        }
        Controller.Delete = function Delete(Product) {
            Controller.service.Delete(Product, function () {
                console.log("deleted", Product);
                Controller.scope.ProductsList.remove(function (c) {
                    return c.Id == Product.Id;
                });
                Controller.scope.Product = null;
                Controller.scope.CategoriesList.forEach(function (c) {
                    c.Checked = false;
                });
                Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Product deleted", ResultMessageTypes.Success);
            }, function (error) {
                Controller.scope.OperationResultMessage = new OperationResultMessage("Oops!", "Failed to delete product", ResultMessageTypes.Error);
                console.log("Failed to delete", Product, error);
            });
        }
        Controller.prototype.SetupScope = function (scope) {
            scope.Labels = {
            };
            scope.Labels.btnSave = "Create";
            scope.OperationResultMessage = null;
            Controller.categoryService.GetAll(null, function (categories) {
                scope.CategoriesList = categories;
            }, function (reason) {
                scope.OperationResultMessage = new OperationResultMessage("Oops", "Failed to load a list of categories", ResultMessageTypes.Error);
                console.log("Failed to load categories: ", reason);
            });
            scope.$watch(function (s) {
                return s.Product;
            }, function (n, o, scope) {
                scope.Product && scope.Product.Id ? scope.Labels.btnSave = "Update" : scope.Labels.btnSave = "Create";
            });
            scope.SelectProductForUpdate = function (product) {
                console.log("setting Product for update", product);
                scope.Product = product;
                scope.CategoriesList.forEach(function (c) {
                    if(product.Categories == null) {
                        c.Checked = false;
                    } else {
                        if(product.Categories.some(function (p) {
                            return c.Id == p.Id;
                        })) {
                            c.Checked = true;
                        } else {
                            c.Checked = false;
                        }
                    }
                });
            };
            scope.btnSave_Click = function () {
                var categories = scope.CategoriesList.findAll(function (c) {
                    return c.Checked == true;
                });
                scope.Product.Categories = categories;
                console.log("Saving a product: ", scope.Product);
                if(scope.Product.Id != null) {
                    Controller.Update(scope.Product);
                } else {
                    Controller.Create(scope.Product);
                }
            };
            scope.btnDelete_Click = function () {
                Controller.Delete(scope.Product);
            };
            scope.btnClear_Click = function () {
                scope.Product = null;
                scope.CategoriesList.forEach(function (c) {
                    c.Checked = false;
                });
            };
        };
        return Controller;
    })();
    Product.Controller = Controller;    
})(Product || (Product = {}));


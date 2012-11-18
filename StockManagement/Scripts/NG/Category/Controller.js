var Category;
(function (Category) {
    var Controller = (function () {
        function Controller($scope, $resource) {
            if(Controller.service == null) {
                Controller.service = new Category.Service($resource);
            }
            if(Controller.scope == null) {
                Controller.scope = $scope;
            }
            this.SetupScope($scope);
            Controller.GetAll();
        }
        Controller.service = null;
        Controller.scope = null;
        Controller.Create = function Create(category) {
            return Controller.service.Create(category, function (newCategory) {
                Controller.scope.CategoriesList.add(newCategory);
                Controller.scope.Category = null;
                Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Category saved", ResultMessageTypes.Success);
            }, function (reason) {
                Controller.scope.OperationResultMessage = new OperationResultMessage("Oops", "Failed to save new category", ResultMessageTypes.Error);
            });
        }
        Controller.GetAll = function GetAll() {
            return Controller.service.GetAll(null, function (categories) {
                Controller.scope.CategoriesList = categories;
            }, function (reason) {
                Controller.scope.OperationResultMessage = new OperationResultMessage("Oops", "Failed to retrieve categories", ResultMessageTypes.Error);
                console.log("Failed to get all categories, reason: ", reason);
            });
        }
        Controller.Get = function Get(id) {
            return Controller.service.Get(id, function (category) {
            }, function (reason) {
            });
        }
        Controller.Update = function Update(category) {
            return Controller.service.Update(category, function (category) {
                Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Category updated", ResultMessageTypes.Success);
            }, function (errData) {
                Controller.scope.OperationResultMessage = new OperationResultMessage("Oops!", "Failed to update category", ResultMessageTypes.Error);
                console.log(errData);
            });
        }
        Controller.Delete = function Delete(category) {
            Controller.service.Delete(category, function () {
                console.log("deleted", category);
                Controller.scope.CategoriesList.remove(function (c) {
                    return c.Id == category.Id;
                });
                Controller.scope.Category = null;
                Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Category deleted", ResultMessageTypes.Success);
            }, function (error) {
                Controller.scope.OperationResultMessage = new OperationResultMessage("Oops!", "Failed to delete category", ResultMessageTypes.Error);
                console.log("Failed to delete", category, error);
            });
        }
        Controller.prototype.SetupScope = function (scope) {
            scope.Labels = {
            };
            scope.Labels.btnSave = "Create";
            scope.OperationResultMessage = null;
            scope.$watch(function (s) {
                return s.Category;
            }, function (n, o, scope) {
                scope.Category && scope.Category.Id ? scope.Labels.btnSave = "Update" : scope.Labels.btnSave = "Create";
            });
            scope.SelectCategoryForUpdate = function (category) {
                console.log("setting category for update", category);
                scope.Category = category;
            };
            scope.btnSave_Click = function () {
                if(scope.Category.Id != null) {
                    Controller.Update(scope.Category);
                } else {
                    Controller.Create(scope.Category);
                }
            };
            scope.btnDelete_Click = function () {
                Controller.Delete(scope.Category);
            };
            scope.btnClear_Click = function () {
                scope.Category = null;
            };
        };
        return Controller;
    })();
    Category.Controller = Controller;    
})(Category || (Category = {}));


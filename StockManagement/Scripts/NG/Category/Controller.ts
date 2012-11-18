/// <reference path="../../dts/angular-1.0.d.ts" />
/// <reference path="../../dts/angular-resource-1.0.d.ts" />
/// <reference path="ICategoryScope.ts" />
/// <reference path="CategoryModel.ts" />
/// <reference path="Service.ts" />
/// <reference path="../../dts/sugar-1.3.d.ts" />

module Category {
    export  class Controller {
        static service: Service;
        static scope: ICategoryScope;

        constructor ($scope: ICategoryScope, $resource: ng.resource.IResourceService) {
            if (Controller.service == null)
                Controller.service = new Service($resource);
            if (Controller.scope == null)
                Controller.scope = $scope;

            this.SetupScope($scope);
            Controller.GetAll();
        }

        static Create(category: CategoryModel) {
            return service.Create(category,
             function (newCategory: CategoryModel) {  // success
                 Controller.scope.CategoriesList.add(newCategory);
                 Controller.scope.Category = null;
                 Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Category saved", ResultMessageTypes.Success);
             },
             function (reason) {  // failure
                 Controller.scope.OperationResultMessage = new OperationResultMessage("Oops", "Failed to save new category", ResultMessageTypes.Error);
             });
        }

        static GetAll() {
            return service.GetAll(null, function (categories: CategoryModel[]) {
                Controller.scope.CategoriesList = categories;
            }, function (reason: any) {
                Controller.scope.OperationResultMessage = new OperationResultMessage("Oops", "Failed to retrieve categories", ResultMessageTypes.Error);
                console.log("Failed to get all categories, reason: ", reason);
            });
        }

        static Get(id: string) {
            return service.Get(id, function (category: any) {
            }, function (reason: any) {
            });
        }

        static Update(category: CategoryModel) {
            return service.Update(category,
                function (category: CategoryModel) {
                    Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Category updated", ResultMessageTypes.Success);
                },
                function (errData: any) {
                    Controller.scope.OperationResultMessage = new OperationResultMessage("Oops!", "Failed to update category", ResultMessageTypes.Error);
                    console.log(errData);
                });
        }

        static Delete(category: CategoryModel) {
            Controller.service.Delete(category, function () {
                console.log("deleted", category);
                Controller.scope.CategoriesList.remove(function (c: CategoryModel) { return c.Id == category.Id });
                Controller.scope.Category = null;
                Controller.scope.OperationResultMessage = new OperationResultMessage("Success", "Category deleted", ResultMessageTypes.Success);
            },
                 function (error) {
                     Controller.scope.OperationResultMessage = new OperationResultMessage("Oops!", "Failed to delete category", ResultMessageTypes.Error);
                     console.log("Failed to delete", category, error);
                 });
        }

        SetupScope(scope: ICategoryScope) {

            scope.Labels = {};
            scope.Labels.btnSave = "Create";
            scope.OperationResultMessage = null;

            scope.$watch(function (s: ICategoryScope) { return s.Category; },
                function (n: any, o: any, scope: ICategoryScope) {
                    scope.Category && scope.Category.Id ? scope.Labels.btnSave = "Update" : scope.Labels.btnSave = "Create";
                });

            scope.SelectCategoryForUpdate = function (category: CategoryModel) {
                console.log("setting category for update", category);
                scope.Category = category;
            }

            scope.btnSave_Click = function () {
                if (scope.Category.Id != null) {
                    Controller.Update(scope.Category);
                }
                else {
                    Controller.Create(scope.Category);
                }
            }

            scope.btnDelete_Click = function () {
                Controller.Delete(scope.Category);
            }

            scope.btnClear_Click = function () {
                scope.Category = null;
            }
        }
    }
}
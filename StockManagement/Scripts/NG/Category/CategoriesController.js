var Categories;
(function (Categories) {
    var Controller = (function () {
        function Controller(scope) {
            this.scope = scope;
            console.log("categories controller started");
            scope.Create = function (category) {
                return new Categories.CategoryModel();
            };
            scope.Update = function (category) {
                return new Categories.CategoryModel();
            };
        }
        Controller.Create = function Create(category) {
            return new Categories.CategoryModel();
        }
        return Controller;
    })();
    Categories.Controller = Controller;    
})(Categories || (Categories = {}));


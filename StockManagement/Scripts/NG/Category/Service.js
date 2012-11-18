var Category;
(function (Category) {
    var Service = (function () {
        function Service(resource) {
            this.resource = resource;
        }
        Service.prototype.GetAll = function (filter, success, error) {
            var provider = this.resource("/api/category/");
            provider.query({
            }, success, error);
        };
        Service.prototype.Get = function (id, success, error) {
            if(id.length == 0) {
                error("Id is not specified");
                return;
            }
            var provider = this.resource("/api/category/" + id);
            var a = provider.get({
            }, success, error);
            return new Category.CategoryModel();
        };
        Service.prototype.Create = function (category, success, error) {
            var provider = this.resource("/api/category");
            provider.save(category, success, error);
        };
        Service.prototype.Update = function (category, success, error) {
            console.log("Service: Update");
            var provider = this.resource("/api/category", {
            }, {
                update: {
                    method: 'PUT'
                }
            });
            provider.update(category, success, error);
            return category;
        };
        Service.prototype.Delete = function (category, success, error) {
            var provider = this.resource("/api/category");
            provider.delete(category, success, error);
        };
        return Service;
    })();
    Category.Service = Service;    
})(Category || (Category = {}));


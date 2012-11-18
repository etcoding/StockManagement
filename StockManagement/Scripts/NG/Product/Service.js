var Product;
(function (Product) {
    var Service = (function () {
        function Service(resource) {
            this.resource = resource;
        }
        Service.prototype.GetAll = function (filter, success, error) {
            var provider = this.resource("/api/Product/");
            provider.query({
            }, success, error);
        };
        Service.prototype.Get = function (id, success, error) {
            if(id.length == 0) {
                error("Id is not specified");
                return;
            }
            var provider = this.resource("/api/Product/" + id);
            var a = provider.get({
            }, success, error);
            return new Product.ProductModel();
        };
        Service.prototype.Create = function (Product, success, error) {
            var provider = this.resource("/api/Product");
            provider.save(Product, success, error);
        };
        Service.prototype.Update = function (Product, success, error) {
            console.log("Service: Update");
            var provider = this.resource("/api/Product", {
            }, {
                update: {
                    method: 'PUT'
                }
            });
            provider.update(Product, success, error);
            return Product;
        };
        Service.prototype.Delete = function (Product, success, error) {
            var provider = this.resource("/api/Product");
            provider.delete(Product, success, error);
        };
        return Service;
    })();
    Product.Service = Service;    
})(Product || (Product = {}));


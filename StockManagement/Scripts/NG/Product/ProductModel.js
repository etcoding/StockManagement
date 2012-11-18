var Product;
(function (Product) {
    var ProductModel = (function () {
        function ProductModel() { }
        ProductModel.prototype.IsValid = function () {
            return this.Name != null && this.Categories != null && this.Categories[0] != null;
        };
        return ProductModel;
    })();
    Product.ProductModel = ProductModel;    
})(Product || (Product = {}));


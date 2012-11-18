var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var Product;
(function (Product) {
    var CategoryModelCheckable = (function (_super) {
        __extends(CategoryModelCheckable, _super);
        function CategoryModelCheckable() {
            _super.apply(this, arguments);

        }
        return CategoryModelCheckable;
    })(Category.CategoryModel);
    Product.CategoryModelCheckable = CategoryModelCheckable;    
})(Product || (Product = {}));


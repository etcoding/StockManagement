/// <reference path="../../dts/angular-1.0.d.ts" />
/// <reference path="../../dts/angular-resource-1.0.d.ts" />
/// <reference path="ProductModel.ts" />
/// <reference path="../../ODataFilter.ts" />

module Product {
    export  class Service {
        constructor (private resource: ng.resource.IResourceService) {
        }

        GetAll(filter: ODataFilter, success: (products: ProductModel[]) => any, error: (reason: any) =>any) {
            var provider = this.resource("/api/Product/");

            // Remember that TS is a JS - even though I declare that I expect an array of ProductModel, JS provides no type safety,
            // so any object can be passed in.
            provider.query(filter, success, error);
        }

        Get(id: string, success: (Product: ProductModel) => any, error: (reason: string) => any) {
            if (id.length == 0) {
                error("Id is not specified");
                return;
            }

            var provider = this.resource("/api/Product/" + id);
            var a = provider.get({}, success, error);

            return new ProductModel();
        }

        Create(Product: ProductModel, success: (Product: ProductModel) => void , error: (reason: any) => void ) {
            var provider = this.resource("/api/Product");
            provider.save(Product, success, error);
        }

        Update(Product: ProductModel, success: (Product: ProductModel) => void , error: (reason: any) => void ) {
            console.log("Service: Update");
            // to enable update method need to make a change to angular-resource.d.ts file 
            var provider = this.resource("/api/Product", {}, { update: { method: 'PUT' } });
            provider.update(Product, success, error);
            return Product;
        }

        Delete(Product: ProductModel, success: () => void , error: (reason: any) =>void ) {
            var provider = this.resource("/api/Product");
            // catch with raven Ids  here - I only need to pass an id here, and the code could look like this:
            //  var provider = this.resource("/api/Product/:productId");
            //  provider.delete({ productId: Product.Id }, success, error);
            // but with raven's ids looking like "product/123" it gets confused, and responds with 404.
            // so what I will do instead is just pass the whole object, and MVC will happily figure the id out 
            provider.delete (Product, success, error);
        }
    }
}
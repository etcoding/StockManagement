/// <reference path="../../dts/angular-1.0.d.ts" />
/// <reference path="../../dts/angular-resource-1.0.d.ts" />
/// <reference path="ProductModel.ts" />
/// <reference path="../../ODataFilter.ts" />

module Product {
    export  class Service {
        constructor (private resource: ng.resource.IResourceService) {
        }

        GetAll(filter: ODataFilter, success: (categories: ProductModel[]) => any, error: (reason: any) =>any) {
            var provider = this.resource("/api/Product/");
            provider.query({}, success, error);
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
            provider.delete (Product, success, error);
        }
    }
}
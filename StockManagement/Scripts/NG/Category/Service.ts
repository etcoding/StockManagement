/// <reference path="../../dts/angular-1.0.d.ts" />
/// <reference path="../../dts/angular-resource-1.0.d.ts" />
/// <reference path="CategoryModel.ts" />
/// <reference path="../../ODataFilter.ts" />

module Category {
    export  class Service {
        constructor (private resource: ng.resource.IResourceService) {
        }

        GetAll(filter: ODataFilter, success: (categories: CategoryModel[]) => void, error: (reason: any) =>void ) {
            var provider = this.resource("/api/category/");
            provider.query({}, success, error);
        }

        Get(id: string, success: (category: CategoryModel) => void, error: (reason: string) => void ) {
            if (id.length == 0) {
                error("Id is not specified");
                return;
            }

            var provider = this.resource("/api/category/" + id);
            var a = provider.get({}, success, error);

            return new CategoryModel();
        }

        Create(category: CategoryModel, success: (category: CategoryModel) => void , error: (reason: any) => void ) {
            var provider = this.resource("/api/category");
            provider.save(category, success, error);
        }

        Update(category: CategoryModel, success: (category: CategoryModel) => void , error: (reason: any) => void ) {
            console.log("Service: Update");
            // to enable update method need to make a change to angular-resource.d.ts file 
            var provider = this.resource("/api/category", {}, { update: { method: 'PUT' } });
            provider.update(category, success, error);
            return category;
        }

        Delete(category: CategoryModel, success: () => void , error: (reason: any) =>void ) {
            var provider = this.resource("/api/category");
            provider.delete (category, success, error);
        }
    }
}
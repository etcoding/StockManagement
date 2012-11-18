/// <reference path="dts/angular-1.0.d.ts" />
/// <reference path="dts/angular-resource-1.0.d.ts" />

class CategoryModel {
    Id: string;
    Name: string;
}

class CategoryRepo {
    constructor (private resource: ng.resource.IResource, private resourceService: ng.resource.IResourceService) {
    }

    Save(category: CategoryModel, callback: () => any) {
        this.resource.$save(category, callback);
    }

    //Get(callback: () => CategoryModel) {
    //   this.resourceService("/api/
    //     this.resource.$save(, callback);
    //}
}
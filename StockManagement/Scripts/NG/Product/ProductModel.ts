/// <reference path="../Category/CategoryModel.ts" />
/// <reference path="../../IValidatableObject.ts" />

module Product {
    export class ProductModel implements IValidatableObject {
        public Id: string;
        public Name: string;
        public Categories: Category.CategoryModel[];

        public IsValid() {
            // tsc compiler fails when checking for this.Categories.length > 0; Logged issue on CodePlex.
            console.log("checking...");
            return this.Name != null && this.Categories != null && this.Categories[0] != null;
        }
    }
}
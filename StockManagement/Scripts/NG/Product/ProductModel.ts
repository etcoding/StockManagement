/// <reference path="../Category/CategoryModel.ts" />

module Product {
    export class ProductModel {
        public Id: string;
        public Name: string;
        public Categories: Category.CategoryModel[];
    }
}
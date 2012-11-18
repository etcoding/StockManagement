/// <reference path="../../dts/angular-1.0.d.ts" />
/// <reference path="../../dts/angular-resource-1.0.d.ts" />
/// <reference path="CategoryModel.ts" />
/// <reference path="../../OdataFilter.ts" />
/// <reference path="../OperationResultMessage.ts" />

module Category {
    export interface ICategoryScope extends ng.IScope {
        Category: CategoryModel;
        CategoriesList: CategoryModel[];
        OperationResultMessage: OperationResultMessage;

        Labels: any;

        SelectCategoryForUpdate(category: CategoryModel): void;

        btnSave_Click(): void;
        btnClear_Click(): void;
        btnDelete_Click(): void;
    }
}
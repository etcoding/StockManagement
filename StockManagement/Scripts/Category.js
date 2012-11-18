var CategoryModel = (function () {
    function CategoryModel() { }
    return CategoryModel;
})();
var CategoryRepo = (function () {
    function CategoryRepo(resource, resourceService) {
        this.resource = resource;
        this.resourceService = resourceService;
    }
    CategoryRepo.prototype.Save = function (category, callback) {
        this.resource.$save(category, callback);
    };
    return CategoryRepo;
})();

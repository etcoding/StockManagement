var Store;
(function (Store) {
    var Controller = (function () {
        function Controller() {
            console.log("Store controller started");
        }
        return Controller;
    })();
    Store.Controller = Controller;    
})(Store || (Store = {}));


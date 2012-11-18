var OperationResultMessage = (function () {
    function OperationResultMessage(header, message, type) {
        this.header = header;
        this.message = message;
        this.type = type;
    }
    return OperationResultMessage;
})();
var ResultMessageTypes = (function () {
    function ResultMessageTypes() { }
    ResultMessageTypes.Info = "info";
    ResultMessageTypes.Error = "error";
    ResultMessageTypes.Success = "success";
    return ResultMessageTypes;
})();

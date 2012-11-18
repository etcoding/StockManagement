class OperationResultMessage {
    constructor (public header: string, public message: string, public type: string) { }
}

class ResultMessageTypes {
    static Info = "info";
    static Error = "error";
    static Success = "success";
}
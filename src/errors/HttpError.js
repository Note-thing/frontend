export default class HttpError extends Error {
    constructor(status, msg, errorObject) {
        super(msg);
        this.status = status;
        this.errorObject = errorObject;
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return this.message;
    }

    getErrorObject() {
        return this.errorObject;
    }
}

export default class HttpError extends Error {
    constructor(status, msg) {
        super(msg);
        this.status = status;
    }

    getStatus() {
        return this.status;
    }

    getMessage() {
        return JSON.parse(JSON.parse(this.message).message);
    }
}

class HttpException extends Error {
    status: number;
    message: string;
    method: string;

    constructor(status: number, message: string, method: string) {
        super(message);
        this.status = status;
        this.message = message;
        this.method = method;
    }
}

export default HttpException;

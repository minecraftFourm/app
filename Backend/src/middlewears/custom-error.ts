class CustomError extends Error {
    code: Number;
    constructor(msg = "Something went wrong...", code: Number) {
        super(msg);
        this.code = code;
    }
}

export default CustomError;
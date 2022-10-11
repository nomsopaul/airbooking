export const createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.messagge = message;
    return err;
};
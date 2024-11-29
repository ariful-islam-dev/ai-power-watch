
// @ Not Found 
const notFound = (msg="Resource not found") => {
    let error = new Error(msg);
    error.status = 404;
    error.message = msg;
    return error;
}


// @ Server Error

const serverError = (msg="Internal Server error") => {
    const error = new Error(msg);
    error.status = 500;
    error.code = error.status;
    error.message = msg;
    return error;
}

// @ Bad Request

const badRequest = (msg="Bad Request") => {
    const error = new Error(msg);
    error.status = 400;
    error.code = error.status;
    error.message = msg;
    return error;
}

// @ Authentication Error
const authenticationError = (msg="Authentication Error") => {
    const error = new Error(msg);
    error.status = 401;
    error.code = error.status;
    error.message = msg;
    return error;
}

// @ authorization error
const authorizationError = (msg="Authorization Error") => {
    const error = new Error(msg);
    error.status = 403;
    error.code = error.status;
    error.message = msg;
    return error;
}

module.exports = { notFound, serverError, badRequest, authenticationError, authorizationError }
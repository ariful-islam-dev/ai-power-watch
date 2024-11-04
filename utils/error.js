
// @ Not Found 
const notFound = (msg="Resource not found") => {
    const error = new Error(msg);
    error.status = 404;
    return error;
}


// @ Server Error

const serverError = (msg="Internal Server error") => {
    const error = new Error(msg);
    error.status = 500;
    return error;
}

// @ Bad Request

const badRequest = (msg="Bad Request") => {
    const error = new Error(msg);
    error.status = 400;
    return error;
}

// @ Authentication Error
const authenticationError = (msg="Authentication Error") => {
    const error = new Error(msg);
    error.status = 401;
    return error;
}

// @ authorization error
const authorizationError = (msg="Authorization Error") => {
    const error = new Error(msg);
    error.status = 403;
    return error;
}

module.exports = { notFound, serverError, badRequest, authenticationError, authorizationError }
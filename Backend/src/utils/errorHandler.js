//global error handler
export const errorHandler = (err, req, res, next) => {
    
    console.error("❌ Error caught by errorHandler:", err); 
    
    //for expected errors
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            status: false,
            message: err.message
        })
    }
    //for unexpected errors
    res.status(500).json({
        status:false,
        message: err.message || "Something went wrong!!!"
    })
}

export class AppError extends Error{
    statusCode;
    isOpertaional;

    constructor(message, statusCode = 500, isOpertaional = true){
        super(message);
        this.statusCode = statusCode;
        this.isOpertaional = isOpertaional;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError{
    constructor(message = "resource not found"){
        super(message, 404);
    }
}

export class ConflictError extends AppError{
    constructor(message = "conflict occured"){
        super(message, 409);
    }
}

export class BadRequestError extends AppError{
    constructor(message = "bad request occured"){
        super(message, 400);
    }
}

export class UnauthorizedAccessError extends AppError{
    constructor(message = "Unauthorized Access"){
        super(message, 401);
    }
}
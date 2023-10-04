import {z} from "zod";

export class ErrorHandler extends Error {
    errorCode: number;
    message: string;

    constructor(status: number, message: string) {
        super()
        this.errorCode = status;
        this.message = message;
    }

    static pageNotFound(message = 'Page Not Found') {
        return new ErrorHandler(404, message);
    }

    static forbidden(message = 'You have no access! Restricted data.') {
        return new ErrorHandler(403, message);
    }

    static validationError(message = 'All fields are required!') {
        return new ErrorHandler(422, message);
    }

    static userAlreadyRegistered(message = 'User already registered') {
        return new ErrorHandler(409, message);
    }

    static incorrectUsernameOrPassword(message = 'Incorrect username or password') {
        return new ErrorHandler(401, message);
    }

    static serverError(message = 'Internal Error') {
        return new ErrorHandler(500, message);
    }

    static zodValidationError(error: z.ZodError) {
        return new ErrorHandler(422, error.message);
    }
}
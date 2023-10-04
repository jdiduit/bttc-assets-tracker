import {NextFunction, Response} from "express";
import {ServerRequest} from "./auth.middleware";

export const errorMiddleware = (err, req: ServerRequest, res: Response, next: NextFunction) => {
    if (err && err.errorCode) {
        res.status(err.errorCode).json({
            error: {
                status: err.errorCode,
                message: err.message
            }
        })
    } else {
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}
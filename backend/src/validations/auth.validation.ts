import {z} from "zod";
import {NextFunction, Request, Response} from "express";

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const registerSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export const validateRegisterData = (req: Request, res: Response, next: NextFunction) => {
    try {
        registerSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(422).json({error: 'Invalid login data'});
    }
};

export const validateLoginData = (req: Request, res: Response, next: NextFunction) => {
    try {
        loginSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(422).json({error: 'Invalid login data'});
    }
};
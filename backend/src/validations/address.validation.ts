import {z} from "zod";
import {NextFunction, Request, Response} from "express";

export const addAddressSchema = z.object({
    name: z.string(),
    address: z.string(),
});

export const editAddressSchema = z.object({
    id: z.string(),
    name: z.string(),
    address: z.string(),
});

export const deleteAddressSchema = z.object({
    id: z.string(),
});

export const setSelectedAddressSchema = z.object({
    id: z.string(),
});

export const validateAddAddressData = (req: Request, res: Response, next: NextFunction) => {
    try {
        addAddressSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(422).json({error: 'Invalid add address data'});
    }
};

export const validatEditAddressData = (req: Request, res: Response, next: NextFunction) => {
    try {
        editAddressSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(422).json({error: 'Invalid edit address data'});
    }
};

export const validatDeleteAddressData = (req: Request, res: Response, next: NextFunction) => {
    try {
        deleteAddressSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(422).json({error: 'Invalid edit address data'});
    }
};

export const validatSetSelectedAddressData = (req: Request, res: Response, next: NextFunction) => {
    try {
        setSelectedAddressSchema.parse(req.body);
        next();
    } catch (error) {
        res.status(422).json({error: 'Invalid edit address data'});
    }
};


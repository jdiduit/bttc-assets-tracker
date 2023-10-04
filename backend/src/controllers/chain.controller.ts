import {Response} from "express";
import {ServerRequest} from "../middlewares/auth.middleware";
import {ChainService} from "../services/chain.services";

const {getAllByType} = new ChainService()

export class ChainController {
    async getAllByType(req: ServerRequest, res: Response) {
        const {chainType} = req.params
        const chains = await getAllByType(chainType);
        return res.json(chains)
    };
}


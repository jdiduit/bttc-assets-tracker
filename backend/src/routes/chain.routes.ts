import {Router} from 'express'
import {asyncHandler} from "../utils/asyncHandler";
import authMiddleware from "../middlewares/auth.middleware";
import {ChainController} from "../controllers/chain.controller";

const chainRoute = Router()

const {getAllByType} = new ChainController();

chainRoute.get('/:chainType', [authMiddleware], asyncHandler(getAllByType))

export default chainRoute
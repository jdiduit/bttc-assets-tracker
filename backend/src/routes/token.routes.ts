import {Router} from 'express'
import {asyncHandler} from "../utils/asyncHandler";
import authMiddleware from "../middlewares/auth.middleware";
import {TokenController} from "../controllers/token.controller";

const tokenRoute = Router()

const {
    toggleTokenActiveStatus,
    getAllTokensByStatus,
    checkExistTokenByAddress,
    getAllTokens,
    createToken
} = new TokenController();

tokenRoute.get('/by-status', [authMiddleware], asyncHandler(getAllTokensByStatus))
tokenRoute.post('/add', [authMiddleware], asyncHandler(createToken))
tokenRoute.get('/', [authMiddleware], asyncHandler(getAllTokens))
tokenRoute.get('/:address', [authMiddleware], asyncHandler(checkExistTokenByAddress))
tokenRoute.patch('/', [authMiddleware], asyncHandler(toggleTokenActiveStatus))

export default tokenRoute
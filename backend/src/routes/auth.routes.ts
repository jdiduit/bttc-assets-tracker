import {Router} from 'express'
import authMiddleware from '../middlewares/auth.middleware';
import {validateLoginData, validateRegisterData} from '../validations/auth.validation';
import {asyncHandler} from "../utils/asyncHandler";
import {AuthController,} from '../controllers/auth.controller';

const userRoute = Router()

const {login, register, setSelectedChain, getMe} = new AuthController();

userRoute.post('/register', validateRegisterData, asyncHandler(register))
userRoute.post('/login', validateLoginData, asyncHandler(login))
userRoute.get('/current-user', authMiddleware, asyncHandler(getMe))
userRoute.patch('/set-current-chain', [authMiddleware], asyncHandler(setSelectedChain))

export default userRoute
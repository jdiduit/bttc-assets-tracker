import {Router} from 'express';
import userRoute from './auth.routes';
import addressRoutes from "./address.routes";
import tokenRoute from "./token.routes";
import chainRoute from "./chain.routes";

const router = Router();

router.use("/tokens", tokenRoute)
router.use("/chains", chainRoute)
router.use("/auth", userRoute)
router.use("/wallet-address", addressRoutes)

export default router
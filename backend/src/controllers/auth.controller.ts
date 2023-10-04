import {Response} from "express";
import {ServerRequest} from "../middlewares/auth.middleware";
import {AuthService} from "../services/auth.service";

const {login, register, setSelectedChain, getMy, getAllUsers} = new AuthService()

export class AuthController {
    async register(req: ServerRequest, res: Response) {
        const {username, password} = req.body
        const user = await register({
            username,
            password
        });
        return res.status(201).json(user)
    }

    async login(req: ServerRequest, res: Response) {
        const {username, password} = req.body
        const token = await login({
            username,
            password
        })
        return res.json(token)
    };

    async allUsers(req: ServerRequest, res: Response) {
        const users = await getAllUsers();
        return res.json(users)
    };

    async getMe(req: ServerRequest, res: Response) {
        const users = await getMy(req.user);
        return res.json(users)
    };

    async setSelectedChain(req: ServerRequest, res: Response) {
        const {id} = req.query as { id: string }
        const user = await setSelectedChain(id, req.user);
        return res.json(user)
    };
}


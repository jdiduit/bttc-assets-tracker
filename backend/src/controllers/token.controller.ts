import {Response} from "express";
import {ServerRequest} from "../middlewares/auth.middleware";
import {TokenService} from "../services/token.service";

const {
    createToken,
    getAllTokensByStatus,
    getAllTokens,
    toggleTokenActiveStatus,
    checkExistTokenByAddress
} = new TokenService()

export class TokenController {
    async createToken(req: ServerRequest, res: Response) {
        const {name, address, chainType, symbol, decimals} = req.body
        const newAddress = await createToken({
            name,
            address,
            symbol,
            decimals,
            user: req?.user
        });
        return res.status(201).json(newAddress)
    }

    async getAllTokens(req: ServerRequest, res: Response) {
        const {walletAddressId, chainId, orderSort, sortBy} = req.query as {
            orderSort: 'asc' | 'desc',
            sortBy: string,
            walletAddressId: string,
            chainId: string
        }
        const addresses = await getAllTokens(walletAddressId, chainId, sortBy, orderSort);
        return res.json(addresses)
    };

    async checkExistTokenByAddress(req: ServerRequest, res: Response) {
        const {address} = req.params as {
            address: string,
        }
        const addresses = await checkExistTokenByAddress(address);
        return res.json(addresses)
    };

    async getAllTokensByStatus(req: ServerRequest, res: Response) {
        const {status, walletAddressId, chainId, orderSort, sortBy} = req.query as {
            walletAddressId: string,
            chainId: string,
            orderSort: string,
            sortBy: string,
            status: string
        }
        const addresses = await getAllTokensByStatus(walletAddressId, chainId, status, orderSort, sortBy);
        return res.json(addresses)
    };

    async toggleTokenActiveStatus(req: ServerRequest, res: Response) {
        const {walletAddressId, tokenId, chainType} = req.body
        const updatedAddress = await toggleTokenActiveStatus({
            walletAddressId,
            tokenId,
            chainType
        });
        return res.json(updatedAddress)
    };
}


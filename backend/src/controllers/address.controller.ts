import {Request, Response} from "express";
import {ServerRequest} from "../middlewares/auth.middleware";
import {WalletService} from "../services/address.service";

const {allAddresses, editAddress, addAddress, setSelectedAddress, deleteAddress} = new WalletService()

export class AddressController {
    async addAddress(req: ServerRequest, res: Response) {
        const {name, address} = req.body
        const newAddress = await addAddress({
            name,
            address,
            user: req.user
        });
        return res.status(201).json(newAddress)
    }

    async allAddresses(req: ServerRequest, res: Response) {
        const addresses = await allAddresses(req.user);
        return res.json(addresses)
    };

    async editAddress(req: ServerRequest, res: Response) {
        const {name, address, id} = req.body
        const updatedAddress = await editAddress({
            user: req.user,
            address,
            name,
            id
        });
        return res.json(updatedAddress)
    };

    async deleteAddress(req: ServerRequest, res: Response) {
        const {id} = req.query as {id: string}
        const deletedAddress = await deleteAddress(id, req.user);
        return res.json(deletedAddress)
    };

    async setSelectedAddress(req: ServerRequest, res: Response) {
        const {id} = req.body
        const selectedAddress = await setSelectedAddress(req?.user, id);
        return res.json(selectedAddress)
    };
}


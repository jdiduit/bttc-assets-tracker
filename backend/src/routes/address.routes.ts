import {Router} from 'express'
import {asyncHandler} from "../utils/asyncHandler";
import {AddressController} from "../controllers/address.controller";
import authMiddleware from "../middlewares/auth.middleware";
import {
    validateAddAddressData,
    validatEditAddressData,
    validatSetSelectedAddressData
} from "../validations/address.validation";

const addressRoute = Router()

const {allAddresses, editAddress, setSelectedAddress, addAddress, deleteAddress} = new AddressController();

addressRoute.post('/add', [authMiddleware, validateAddAddressData], asyncHandler(addAddress))

addressRoute.get('/', [authMiddleware], asyncHandler(allAddresses))

addressRoute.put('/', [authMiddleware, validatEditAddressData], asyncHandler(editAddress))

addressRoute.delete('/', [authMiddleware], asyncHandler(deleteAddress))

addressRoute.patch('/selected-address', [authMiddleware, validatSetSelectedAddressData], asyncHandler(setSelectedAddress))

export default addressRoute
import {Suspense} from "react";
import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout.tsx";
import AuthLayout from "../AuthLayout/AuthLayout.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import {Center, Loader} from "@mantine/core";
import {RoutePaths} from "@/Pages/routes.ts";
import Tokens from "@/Pages/Tokens/Tokens.tsx";
import RegisterPage from "@/Pages/RegisterPage/RegisterPage.tsx";
import LoginPage from "@/Pages/LoginPage/LoginPage.tsx";
import Balance from "@/Pages/Balance/Balance.tsx";
import NftCollectionsList from "@/Pages/NftList/NftCollectionsList.tsx";
import Settings from "@/Pages/Settings/Settings.tsx";
import SavedAddresses from "@/Pages/SavedAddresses/SavedAddresses.tsx";
import ChangeNetwork from "@/Pages/ChangeNetwork/ChangeNetwork.tsx";
import NotFound from "@/Pages/NotFound/NotFound.tsx";
import NftsList from "@/Pages/NftList/NftsList/NftsList.tsx";
import NftDetails from "@/Pages/NftList/NftDetails/NftDetails.tsx";
import Mint from "@/Pages/Mint/Mint.tsx";

export const router = createBrowserRouter([
    {
        path: RoutePaths.ROOT,
        element: <Suspense fallback={<Center style={{height: '100%'}}><Loader/></Center>}><Layout/></Suspense>,
        children: [
            {
                path: RoutePaths.LOGIN,
                element: <LoginPage/>,
            },
            {
                path: RoutePaths.REGISTER,
                element: <RegisterPage/>,
            },
            {
                path: RoutePaths.EMPTY,
                element: <ProtectedRoute/>,
                children: [
                    {
                        path: RoutePaths.EMPTY,
                        element: <AuthLayout/>,
                        children: [
                            {
                                path: RoutePaths.EMPTY,
                                element: <Balance/>,
                            },
                            {
                                path: RoutePaths.BALANCE,
                                element: <Balance/>,
                            },
                            {
                                path: RoutePaths.NFTS,
                                element: <NftCollectionsList/>,
                            },
                            {
                                path: RoutePaths.NFTS + '/:id',
                                element: <NftsList/>,
                            },
                            {
                                path: RoutePaths.NFT + '/:id/:tokenId',
                                element: <NftDetails/>,
                            },
                            {
                                path: RoutePaths.SETTINGS,
                                element: <Settings/>,
                            },
                            {
                                path: RoutePaths.SAVED_ADDRESSES,
                                element: <SavedAddresses/>,
                            },
                            {
                                path: RoutePaths.CHANGE_NETWORK,
                                element: <ChangeNetwork/>,
                            },
                            {
                                path: RoutePaths.TOKENS,
                                element: <Tokens/>,
                            },
                        ]
                    }
                ]
            },
            {
                path: RoutePaths.NOT_FOUND,
                element: <NotFound/>,
            },
        ],
    },
    {
        path: RoutePaths.MINT,
        element: <Mint/>,
    },
]);
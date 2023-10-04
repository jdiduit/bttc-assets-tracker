import {Box, Center, Loader} from '@mantine/core';
import {Outlet, useNavigate} from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.tsx";
import {useEffect, useState} from "react";
import classes from './Layout.module.css'
import Header from "../Header/Header.tsx";

import {RoutePaths} from "@/Pages/routes.ts";

const Layout = () => {
    const {fetchUser} = useAuthStore()
    const navigate = useNavigate()
    const [isMounted, setisMounted] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchUser(() => navigate(localStorage.getItem('location')!))
        }
    }, [])

    useEffect(() => {
        if (localStorage.getItem('location') === null || localStorage.getItem('location') === undefined) {
            localStorage.setItem('token', RoutePaths.ROOT)
        }
    }, []);

    useEffect(() => {
        setisMounted(true)
    }, []);

    useEffect(() => {
        if (localStorage) {
            navigate(localStorage.getItem('location')!)
        }
    }, [localStorage]);

    if (!isMounted)
        return <Center style={{height: '100%'}}><Loader/></Center>

    return (
        <Box className={classes.layoutWrapper}>
            <Header/>
            <Box h={'100%'} style={{padding: '80px 0px 0px 0px'}}>
                <Outlet/>
            </Box>
        </Box>
    );
};

export default Layout
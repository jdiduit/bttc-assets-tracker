import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuthStore from "../../store/useAuthStore.tsx";
import {RoutePaths} from "@/Pages/routes.ts";

const ProtectedRoute = () => {
    const {user} = useAuthStore();
    const location = useLocation();

    return (
        (user !== null && localStorage.getItem('token') !== null)
            ? <Outlet/>
            : <Navigate to={RoutePaths.LOGIN} state={{from: location}} replace/>
    );
};

export default ProtectedRoute
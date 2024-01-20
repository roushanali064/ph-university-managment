import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { currentUserToken } from "../../redux/feature/auth/authSlice";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({children}: {children:ReactNode}) => {

    const token = useAppSelector(currentUserToken)
    if(!token){
        return <Navigate to={'/login'} replace />
    }

    return (
        children
    );
};

export default ProtectedRoute;
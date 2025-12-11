import React from 'react';
import useAuth from '../hook/useAuth';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';

const PrivateRoute = ({children}) => {
    const {user, userLoading} = useAuth();
    const location = useLocation();
    if(userLoading){
        return <Loading/>;
    }
    if(user && user.email){
        return children;
    }
    else{
        return <Navigate to="/login" state={location.pathname}/>
    }
};

export default PrivateRoute;
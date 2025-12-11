import React from 'react';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading';
import useAuth from '../hooks/useAuth';

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
import React from 'react';


import Loading from '../Components/Loading';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Forbidden from '../Components/Forbidden';

const CreatorRoute = ({children}) => {
    const {userLoading} = useAuth();
    const {role, isRoleLoading} = useRole();
    if(userLoading || isRoleLoading){
        return <Loading/>
    }
    if(role?.role !== "creator"){
        return <Forbidden/>
    }
    return children;
};

export default CreatorRoute;
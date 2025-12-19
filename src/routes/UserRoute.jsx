import React from 'react';

import Forbidden from '../components/Forbidden';
import Loading from '../Components/Loading';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const UserRoute = ({children}) => {
    const {userLoading} = useAuth();
    const {role, isRoleLoading} = useRole();
    if(userLoading || isRoleLoading){
        return <Loading/>
    }
    if(role !== "user"){
        return <Forbidden/>
    }
    return children;
};

export default UserRoute;
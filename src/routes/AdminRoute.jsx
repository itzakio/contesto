import React from 'react';

import Forbidden from '../components/Forbidden';
import Loading from '../Components/Loading';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

const AdminRoute = ({children}) => {
    const {userLoading} = useAuth();
    const {role, isRoleLoading} = useRole();
    if(userLoading || isRoleLoading){
        return <Loading/>
    }
    if(role?.role !== "admin"){
        return <Forbidden/>
    }
    return children;
};

export default AdminRoute;
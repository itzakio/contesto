import React from 'react';
import UserDashboardHome from './UserDashboardHome/UserDashboardHome';
import useRole from '../../hooks/useRole';

const DashboardHome = () => {
    const {isRoleLoading, role} = useRole();
    return (
        <div>
            <UserDashboardHome/>
        </div>
    );
};

export default DashboardHome;
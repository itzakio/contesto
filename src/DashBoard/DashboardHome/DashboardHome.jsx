import React from "react";
import useRole from "../../hooks/useRole";
import Loading from "../../Components/Loading";
import CreatorDashboardHome from "./CreatorDashboardHome/CreatorDashboardHome";
import UserDashboardHome from "./UserDashboardHome/UserDashboardHome";
import useAuth from "../../hooks/useAuth";
import AdminDashboardHome from "./AdminDashboardHome/AdminDashboardHome";
const DashboardHome = () => {
  const { userLoading } = useAuth();
  const { isRoleLoading, role } = useRole();

  if (isRoleLoading || userLoading) {
    return <Loading />;
  }
  if (role === "admin") {
    return <AdminDashboardHome />;
  } else if (role === "creator") {
    return <CreatorDashboardHome />;
  } else {
    return <UserDashboardHome />;
  }
};

export default DashboardHome;

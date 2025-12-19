import React from "react";
import UserProfile from "../UserProfile";

const AdminDashboardHome = () => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="shadow rounded-xl">
        <UserProfile/>
      </div>
      <div className="shadow rounded-xl"></div>
    </div>
  );
};

export default AdminDashboardHome;

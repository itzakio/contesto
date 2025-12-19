import React from "react";
import UserProfile from "../UserProfile";

const AdminDashboardHome = () => {
  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="shadow rounded-xl">
        <UserProfile />
      </div>
      <div className="shadow rounded-xl flex justify-center items-center">
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
          <h2 className="text-3xl font-bold text-primary mb-2">
            🚧 Under Development
          </h2>
          <p className="text-gray-500">
            This section is currently under development. Please check back soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;

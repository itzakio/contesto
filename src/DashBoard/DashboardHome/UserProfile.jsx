import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UserProfile = () => {
    const {user:authUser} = useAuth();
    const axiosSecure = useAxiosSecure();

    const {data: user, } = useQuery({
        queryKey: ["user-profile", authUser.email],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/user/profile?email=${authUser.email}`)
            return res.data;
        }
    })
  return (
    <div className="max-w-3xl mx-auto bg-base-100 rounded-xl p-6">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="avatar">
          <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={user?.photoURL || "https://img.freepik.com/premium-vector/user-profile-icon-circle_1256048-12499.jpg?semt=ais_hybrid&w=740&q=80"}
              alt="User Avatar"
            />
          </div>
        </div>

        {/* Basic Info */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">
            {user?.name || "Unnamed User"}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>

      {/* Profile Details */}
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold">Address</h3>
          <p className="text-sm text-gray-600">
            {user?.address || "No address added"}
          </p>
        </div>

        <div>
          <h3 className="font-semibold">Bio</h3>
          <p className="text-sm text-gray-600">
            {user?.bio || "No bio available"}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 text-right">
        <Link to="/dashboard/edit-profile">
          <button className="btn btn-primary text-black">
            Edit Profile
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;

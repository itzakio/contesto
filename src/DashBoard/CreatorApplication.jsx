import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import toast from "react-hot-toast";

const CreatorApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const {
    data: creators = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/creators?searchText=${searchText}`);
      return res.data;
    },
  });


  const applicationDeleteHandler = (id) =>{
    axiosSecure.delete(`/creators/${id}`)
    .then(res =>{
        console.log(res.data);
        if(res.data.deletedCount){
            refetch();
            toast.success("Creator application deleted!")
        }
    })
    .catch(error=>{
        toast.error(error.message)
    })
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h3 className="text-2xl font-semibold">
          Pending Applications : {creators.length}
        </h3>
        {/* search user */}
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            required
            placeholder="Find User"
          />
        </label>
      </div>

      <div className="overflow-x-auto table-zebra bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Creator Info</th>
              <th>Category</th>
              <th className="text-center">Admin Actions</th>
              <th className="text-center">More Actions</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((creator, index) => (
              <tr key={creator?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={creator?.photo_url} alt="creator? photo" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{creator?.name}</div>
                      <div className="text-sm opacity-50">{creator?.email}</div>
                    </div>
                  </div>
                </td>
                <td>{creator?.role}</td>
                <td className="text-center space-x-4">
                  <button className="btn btn-primary text-black">Approve</button>
                  <button className="btn btn-error">Reject</button>
                </td>
                <td className="flex justify-center gap-4">
                  <button className="btn">details</button>
                  <button onClick={()=>applicationDeleteHandler(creator._id)} className="btn btn-error">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatorApplication;

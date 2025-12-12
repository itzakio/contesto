import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Loading";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const CreatorApplication = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const {
    data: creators = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["creators-applications", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`/creators?searchText=${searchText}`);
      return res.data;
    },
  });

  const applicationDeleteHandler = (id) => {
    axiosSecure
      .delete(`/creators/${id}`)
      .then((res) => {
        if (res.data.deletedCount) {
          refetch();
          toast.success("Creator application deleted!");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const creatorStatusUpdateHandler = (creator, status) => {
    const CreatorStatus = {
      status: status,
    };
    

    Swal.fire({
      title: `Do you want to ${status} this creator?`,
      icon: "warning",
      showCancelButton: true,
      customClass: {
        title: "swal-text",
        htmlContainer: "swal-text",
        confirmButton: "swal-confirm",
        cancelButton: "swal-cancel",
      },
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/creators/${creator._id}`, CreatorStatus)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: `Creator status update to ${status}!`,

                icon: "success",
                timer: 2500,
                customClass: {
                  title: "swal-text",
                  htmlContainer: "swal-text",
                  confirmButton: "swal-confirm",
                },
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

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
              <th>Categories</th>
              <th className="text-center">Status</th>
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
                        <img src={creator?.photoURL} alt="creator? photo" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{creator?.creatorName}</div>
                      <div className="text-sm opacity-50">{creator?.email}</div>
                    </div>
                  </div>
                </td>
                <td>{creator?.categories?.join(", ")}</td>
                <td>
                  <p
                    className={`rounded-full w-fit p-1 px-2 mx-auto ${
                      creator.status === "pending"
                        ? "bg-yellow-300"
                        : creator.status === "approved"
                        ? "bg-green-300"
                        : "bg-red-300"
                    }`}
                  >
                    {creator?.status}
                  </p>
                </td>
                <td>
                  <div className="flex justify-center gap-4">
                    {creator?.status !== "approved" && <button
                      onClick={() =>
                        creatorStatusUpdateHandler(creator, "approved")
                      }
                      className="btn btn-primary text-black"
                    >
                      Approve
                    </button>}
                    {creator?.status === "pending" &&<button
                      onClick={() =>
                        creatorStatusUpdateHandler(creator, "rejected")
                      }
                      className="btn btn-error"
                    >
                      Reject
                    </button>}
                    {creator?.status === "approved" &&<button
                      onClick={() =>
                        creatorStatusUpdateHandler(creator, "deactivated")
                      }
                      className="btn btn-error"
                    >
                      Deactivate
                    </button>}
                  </div>
                </td>
                <td>
                  <div className="flex justify-center gap-4">
                    <button className="btn">details</button>
                    <button
                      onClick={() => applicationDeleteHandler(creator._id)}
                      className="btn btn-error"
                    >
                      Delete
                    </button>
                  </div>
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

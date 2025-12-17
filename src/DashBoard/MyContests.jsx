import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Loading from "../Components/Loading";
import useAuth from "../hooks/useAuth";
import { Link, useLocation } from "react-router";
import Swal from "sweetalert2";

const MyContests = () => {
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const { user } = useAuth();
  const {
    data: contests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-contests", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/creator/contests?email=${user.email}`
      );
      return res.data;
    },
  });

  const contestDeleteHandler = (id) => {
    Swal.fire({
      title: `Are you sure you want to delete this contest?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/contests/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              title: `Contest deleted successfully!`,
              icon: "success",
              timer: 2500,
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h3 className="text-2xl font-semibold">
          My Contests : {contests.length}
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
            type="text"
            placeholder="Search pending contests"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") e.preventDefault();
            }}
          />
        </label>
      </div>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto table-zebra bg-base-100">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Creator Info</th>
                <th>Categories</th>
                <th className="text-center">Status</th>
                <th className="text-center">Actions</th>
                <th className="text-center">More Actions</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest, index) => (
                <tr key={contest?._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={contest?.contestThumbnail}
                            alt="creator? photo"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{contest?.title}</div>
                        <div className="text-sm opacity-50">
                          Creator Email: {contest?.creatorEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{contest?.category}</td>
                  <td>
                    <p
                      className={`rounded-full w-fit p-1 px-2 mx-auto text-black ${
                        contest?.status === "pending"
                          ? "bg-yellow-300"
                          : contest?.status === "approved"
                          ? "bg-green-300"
                          : "bg-red-300"
                      }`}
                    >
                      {contest?.status}
                    </p>
                  </td>
                  <td>
                    <div className="flex justify-center gap-4">
                      <div
                        className={
                          contest?.status === "approved"
                            ? "cursor-not-allowed inline-block"
                            : "inline-block"
                        }
                      >
                        <Link
                          state={location.pathname}
                          to={`/edit-contest/${contest?._id}`}
                          disabled={contest?.status === "approved"}
                          className="btn btn-primary disabled:cursor-not-allowed text-black"
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center gap-4">
                      <Link
                        to={`/contests-details/${contest._id}`}
                        className="btn text-black"
                      >
                        View Details
                      </Link>
                      <div
                        className={
                          contest?.status === "approved"
                            ? "cursor-not-allowed inline-block"
                            : "inline-block"
                        }
                      >
                        <button
                          onClick={() => contestDeleteHandler(contest?._id)}
                          disabled={contest?.status === "approved"}
                          className="btn btn-error text-black "
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyContests;

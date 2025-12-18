import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Loading";

const UserJoinedContests = () => {
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxiosSecure();
  const location = useLocation();
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["my-joined-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-joined-contests");
      return res.data;
    },
  });
  console.log(contests);

  // const {title, contestThumbnail, prize, category, participationEndAt} = contests?.contest;

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h3 className="text-2xl font-semibold">
          My Participate Contests : {contests.length}
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
                <th>Contest Info</th>
                <th>Category</th>
                <th className="text-center">Contest End Time</th>
                <th className="text-center">Prize</th>
                <th className="text-center">Result</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {contests.map((item, index) => (
                <tr key={item._id}>
                  {/* index */}
                  <td>{index + 1}</td>

                  {/* contest info */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={item.contest.contestThumbnail}
                            alt={item.contest.title}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="font-bold">{item.contest.title}</div>
                        <div className="text-sm opacity-50">
                          Entry Fee: ${item.contest.entryFee}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* category */}
                  <td>{item.contest.category}</td>

                  {/* joined date */}
                  <td className="text-center">
                    {new Date(item.contest.participationEndAt).toLocaleString()}
                  </td>

                  {/* status */}
                  <td className="text-center">${item.contest.prize}</td>

                  {/* result */}
                  <td className="text-center">
                    {item.submissionStatus === "winner" && (
                      <span className="badge badge-success">🏆 Winner</span>
                    )}

                    {item.submissionStatus === "lost" && (
                      <span className="badge badge-error">❌ Lost</span>
                    )}

                    {item.submissionStatus === "pending" && (
                      <span className="badge badge-outline">⏳ Pending</span>
                    )}
                  </td>

                  {/* actions */}
                  <td className="text-center">
                    <div className="flex justify-center gap-3">
                      <Link
                        to={`/contests-details/${item.contest._id}`}
                        className="btn text-black"
                      >
                        View Details
                      </Link>
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

export default UserJoinedContests;

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../../Components/Loading";
import { useState } from "react";

const MyWiningContests = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("")

  const { data: wins = [], isLoading } = useQuery({
    queryKey: ["user-winning-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/user/winning-contests");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (!wins.length) {
    return (
      <p className="text-center text-gray-500">
        You haven’t won any contests yet.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
      <div className="flex items-center justify-between p-4">
        <h3 className="text-2xl font-semibold">
          My Wined Contests : {wins.length}
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
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Contest</th>
            <th>Category</th>
            <th>Prize</th>
            <th>Won On</th>
          </tr>
        </thead>

        <tbody>
          {wins.map((contest, index) => (
            <tr key={index}>
              <td>{index + 1}</td>

              {/* Contest Info */}
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={contest.thumbnail} alt={contest.title} />
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">{contest.title}</div>
                  </div>
                </div>
              </td>

              <td>{contest.category}</td>

              <td className="text-success font-semibold">${contest.prize}</td>

              <td className="text-sm text-gray-500">
                {new Date(contest.wonAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyWiningContests;

import Loading from "../../Components/Loading";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";

const Leaderboard = () => {
  const axiosInstance = useAxios();
  const { data: leaders = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosInstance.get("/leaderboard");
      return res.data;
    },
  });
  console.log(leaders);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <h2
        className="text-3xl text-primary font-bold text-center mb-6"
      >
        🏆 Leaderboard
      </h2>

      <div className="overflow-auto min-h-screen  bg-base-100 shadow rounded-xl">
        <table className="table table-zebra w-full">
          <thead >
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th className="text-center">Total Wins</th>
            </tr>
          </thead>

          <tbody>
            {leaders.map((user, index) => (
              <tr
                key={index}
              >
                <td className="font-bold">#{index + 1}</td>

                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full">
                        <img src={user.photoURL} alt={user.name} />
                      </div>
                    </div>
                    <span className="font-semibold">{user.name}</span>
                  </div>
                </td>

                <td className="font-semibold text-success text-center">
                  {user.totalWins}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

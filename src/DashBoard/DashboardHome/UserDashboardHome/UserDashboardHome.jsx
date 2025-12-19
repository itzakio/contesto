import WinLostChart from "./WinLostChart";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import UserProfile from "../UserProfile";

const UserDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data = [], isLoading } = useQuery({
    queryKey: ["user-win-category-stats", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/user-win-category-stats?email=${user.email}`
      );
      return res.data;
    },
  });

  const { summary = {}, categoryStats = [] } = data;

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="shadow rounded-xl"> <UserProfile/> </div>
      <div className="space-y-8">
        {/* Percentage cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="stat bg-base-100 shadow rounded-xl">
            <div className="text-xl font-semibold">Win Rate</div>
            <div className="stat-value text-success">{summary.winRate}%</div>
            <div className="">{summary.win} wins</div>
          </div>

          <div className="stat bg-base-100 shadow rounded-xl">
            <div className="text-xl font-semibold">Lost Rate</div>
            <div className="stat-value text-error">{summary.lostRate}%</div>
            <div className="">{summary.lost} losses</div>
          </div>
        </div>

        <WinLostChart categoryStats={categoryStats} />
      </div>
    </div>
  );
};

export default UserDashboardHome;

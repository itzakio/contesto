import { useQuery } from "@tanstack/react-query";
import ContestCard from "../../Components/ContestCard";
import useAxios from "../../hooks/useAxios";
import Loading from "../../Components/Loading";
import { Link, useLocation } from "react-router";

const PopularContests = () => {
  const axiosInstance = useAxios();
const location = useLocation();
console.log(location)

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["popular-contests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/contests/popular");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="max-w-[1440px] mx-auto my-16">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary text-center mb-8">
        Popular Contests
      </h2>

      {contests.length === 0 ? (
        <p className="text-center text-gray-500">
          No popular contests available right now.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
          {contests.map((contest, index) => (
            <ContestCard
              key={contest._id}
              contest={contest}
              index={index}
            />
          ))}
        </div>
      )}
      <div className=" mt-8 flex justify-center">
        <Link state={location.pathname} className="btn btn-primary text-black" to='/all-contests'>Show All</Link>
      </div>
    </section>
  );
};

export default PopularContests;

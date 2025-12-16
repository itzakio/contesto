import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "../../hooks/useAxios";
import ContestCard from "../../Components/ContestCard";
import Loading from "../../Components/Loading";

const AllContests = () => {
  const axiosInstance = useAxios();
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-contests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/contests");
      return res.data;
    },
  });

  if(isLoading){
    return <Loading/>
  }
  return (
    <div className="max-w-[1440px] mx-auto margin-y">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary text-center">
        All Contests: {contests?.length}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-4 margin-y">
        {contests.map((contest,index) => (
          <ContestCard key={contest?._id} contest={contest}  index={index}/>
        ))}
      </div>
    </div>
  );
};

export default AllContests;

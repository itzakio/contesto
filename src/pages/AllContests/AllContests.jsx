import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import ContestCard from "../../Components/ContestCard";
import Loading from "../../Components/Loading";
import { useLocation, useSearchParams } from "react-router";

const categories = [
  "All",
  "Quiz",
  "Coding",
  "Creative Design",
  "Writing",
  "Photography",
  "Idea Pitch",
  "Logic & Puzzle",
  "Gaming (Score-based)",
];

const AllContests = () => {
  const axiosInstance = useAxios();
  const [activeCategory, setActiveCategory] = useState("All");
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-contests", activeCategory, category],
    queryFn: async () => {
      const res = await axiosInstance.get("/contests", {
        params: { category: activeCategory },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-[1440px] mx-auto my-12">
      <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary text-center mb-6">
        {activeCategory} Contests
      </h2>

      {/* 🔹 DaisyUI Tabs with Animation */}
      <div className="mb-8 mx-4">
        <div className="overflow-x-auto ">
          <div className="tabs tabs-boxed bg-base-200 p-1 flex w-max mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`tab whitespace-nowrap transition-all duration-300 ease-in-out ${
                  activeCategory === cat
                    ? "tab-active bg-primary text-black scale-105"
                    : "hover:bg-base-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Empty State */}
      {contests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold">No contests found</h3>
          <p className="text-gray-500 mt-2">
            There are no contests available in{" "}
            <span className="font-semibold">{activeCategory}</span> category.
          </p>
        </div>
      ) : (
        /* 🔹 Contest Cards (NO animation) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4">
          {contests.map((contest, index) => (
            <div>
              <ContestCard
                state={location.pathname}
                key={contest._id}
                contest={contest}
                index={index}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllContests;

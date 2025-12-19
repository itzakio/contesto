import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { RxCross2 } from "react-icons/rx";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";
import ContestCard from "./ContestCard";


const FullSearchModal = ({ open, onClose }) => {
  const axiosInstance = useAxios();
  const [searchText, setSearchText] = useState("");

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["search-contests", searchText],
    enabled: open,
    queryFn: async () => {
      const res = await axiosInstance.get("/contests", {
        params: {
          search: searchText, // 🔥 PARTIAL SEARCH
        },
      });
      return res.data;
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-base-100 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-base-100 z-50">
        <div className="max-w-[1440px] mx-auto flex items-center gap-4 p-4 mt-4">
          <input
            type="text"
            placeholder="Search contests (coding, photo, logo...)"
            className="input input-bordered w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            autoFocus
          />

          <button
            onClick={onClose}
            className="btn btn-square btn-ghost text-xl"
          >
            <RxCross2 />
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-[1440px] mx-auto p-6">
        {isLoading ? (
          <Loading />
        ) : contests.length === 0 ? (
          <p className="text-center text-accent">
            No contests found
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {contests.map((contest, index) => (
              <ContestCard
                key={contest._id}
                contest={contest}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FullSearchModal;

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { RxCrossCircled } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";
import ContestCard from "./ContestCard";

const ANIMATION_DURATION = 300; // ms

const FullSearchModal = ({ open, onClose }) => {
  const axiosInstance = useAxios();

  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [shouldRender, setShouldRender] = useState(open);

  // 🔹 Handle mount/unmount with animation
  useEffect(() => {
    if (open) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, ANIMATION_DURATION);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // 🔹 Disable background scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  const { data: contests = [], isLoading, isFetching } = useQuery({
    queryKey: ["search-contests", searchText],
    enabled: open && searchText.trim().length > 0,
    queryFn: async () => {
      const res = await axiosInstance.get("/contests", {
        params: { search: searchText },
      });
      return res.data.contests || res.data;
    },
  });

  const handleSearch = () => {
    if (!inputText.trim()) return;
    setSearchText(inputText.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") onClose();
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 bg-base-100/90 backdrop-blur-md overflow-y-auto
      transition-opacity duration-300 ease-out
      ${open ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`transform transition-all duration-300 ease-out
        ${open
          ? "translate-y-0 scale-100"
          : "translate-y-8 scale-95"
        }`}
      >
        {/* 🔹 Header */}
        <div className="sticky top-0 bg-base-100/95 backdrop-blur z-50 border-b">
          <div className="max-w-[1440px] mx-auto flex items-center gap-2 p-4">
            <input
              type="text"
              placeholder="Search contests (coding, photo, logo...)"
              className="input input-bordered w-full"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
            />

            <button
              onClick={handleSearch}
              className="btn btn-primary btn-square"
            >
              <FiSearch size={20} />
            </button>

            <button
              onClick={onClose}
              className="btn btn-square btn-ghost bg-primary rounded-full text-black"
            >
              <RxCrossCircled size={24} />
            </button>
          </div>
        </div>

        {/* 🔹 Results */}
        <div className="max-w-[1440px] mx-auto p-6">
          {(isLoading || isFetching) ? (
            <div className="flex justify-center py-20">
              <Loading />
            </div>
          ) : searchText.length === 0 ? (
            <p className="text-center text-accent">
              Type a keyword and press Enter or click Search
            </p>
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
    </div>
  );
};

export default FullSearchModal;

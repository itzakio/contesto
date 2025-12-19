import { useState, useMemo } from "react";
import { useNavigate } from "react-router";

const categories = [
  "Quiz",
  "Coding",
  "Creative Design",
  "Writing",
  "Photography",
  "Idea Pitch",
  "Logic & Puzzle",
  "Gaming (Score-based)",
];

const ContestSearchModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  // 🔍 filter categories by input
  const filteredCategories = useMemo(() => {
    return categories.filter((cat) =>
      cat.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  if (!open) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-xl mb-4 text-center">
          Search Contests
        </h3>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Type a category (e.g. coding, photo...)"
          className="input input-bordered w-full mb-4"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
        />

        {/* Results */}
        {filteredCategories.length === 0 ? (
          <p className="text-center text-gray-500">
            No category found
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredCategories.map((cat) => (
              <button
                key={cat}
                className="btn btn-outline"
                onClick={() => {
                  navigate(
                    `/all-contests?category=${encodeURIComponent(cat)}`
                  );
                  onClose();
                  setSearch("");
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContestSearchModal;

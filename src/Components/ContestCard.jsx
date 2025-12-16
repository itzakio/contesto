import { Link } from "react-router";
import { CalendarDays, Trophy, DollarSign } from "lucide-react";

const ContestCard = ({ contest, index }) => {
  const {
    _id,
    title,
    prize,
    entryFee,
    participationEndAt,
    contestThumbnail,
  } = contest;

  return (
    <div data-aos="fade-up" data-aos-delay={index*100} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Thumbnail */}
      <figure className="h-48 overflow-hidden">
        <img
          src={contestThumbnail}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </figure>

      {/* Body */}
      <div className="card-body">
        {/* Title */}
        <h2 className="card-title text-xl font-bold">{title}</h2>

        {/* Info */}
        <div className="space-y-2 text-sm text-gray-600">
          <p className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">Prize:</span> ${prize}
          </p>

          <p className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-500" />
            <span className="font-medium">Entry Fee:</span> ${entryFee}
          </p>

          <p className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-blue-500" />
            <span className="font-medium">Ends:</span>{" "}
            {new Date(participationEndAt).toLocaleDateString()}
          </p>
        </div>

        {/* Action */}
        <div className="card-actions mt-4">
          <Link
            to={`/contests-details/${_id}`}
            className="btn btn-primary btn-block rounded-lg text-black"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;

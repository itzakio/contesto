import { Link } from "react-router";
import { CalendarDays, Trophy, DollarSign } from "lucide-react";
import { PiUsersDuotone } from "react-icons/pi";

const ContestCard = ({ contest, state }) => {
  const { _id, title, prize, entryFee, participationEndAt, contestThumbnail } =
    contest;

  return (
    <div className="card group bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 h-full">
      {/* Thumbnail */}
      <figure className="h-48 overflow-hidden ">
        <img
          src={contestThumbnail}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </figure>

      {/* Body */}
      <div className="card-body flex flex-col justify-between">
        <div className="h-full flex flex-col justify-between">
          {/* Title */}
          <h2 className="card-title text-xl font-bold">{title}</h2>

          <div>
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

              <p className="flex items-center gap-2">
                <PiUsersDuotone className="w-4 h-4 text-pink-500" />
                <span className="font-medium">Participants:</span>{" "}
                {contest.participantCount !== undefined && (
                  <span className=""> {contest.participantCount}</span>
                )}
              </p>
            </div>
          </div>

          {/* Action */}
          <div className="card-actions mt-4">
            <Link
              state={location.pathname}
              to={`/contests-details/${_id}`}
              className="btn btn-primary btn-block rounded-lg text-black"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;

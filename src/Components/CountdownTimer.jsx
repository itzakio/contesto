import { useEffect, useState } from "react";

const CountdownTimer = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const diff = new Date(endTime).getTime() - new Date().getTime();

    if (diff <= 0) return null;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  if (!timeLeft) {
    return (
      <span className="badge badge-error badge-lg mt-3">
        ⛔ Contest Ended
      </span>
    );
  }

  return (
    <div className="flex gap-3 mt-4">
      {Object.entries(timeLeft).map(([key, value]) => (
        <div
          key={key}
          className="bg-base-200 rounded-lg p-3 text-center w-16 shadow"
        >
          <p className="text-xl font-bold">{value}</p>
          <p className="text-[9px] text-center uppercase">{key}</p>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;

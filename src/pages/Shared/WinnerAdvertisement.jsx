import { FaTrophy, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";
import { GiTrophy } from "react-icons/gi";

const WinnerAdvertisement = () => {
  const axiosInstance = useAxios();

  const { data: winners = [], isLoading } = useQuery({
    queryKey: ["recent-winners"],
    queryFn: async () => {
      const res = await axiosInstance.get("/winners/recent");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="relative py-20 bg-base-100 overflow-hidden">
      {/* Decorative gradient */}
      <div className=" pointer-events-none" />

      <div className="relative max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary">
            Winners That Inspire
          </h2>
          <p className="mt-4 text-lg text-base-content/70">
            Real people. Real skills. Real rewards.  
            Contesto turns talent into success stories.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: <FaTrophy />,
              title: "Total Winners",
              value: "1,250+",
              desc: "Across all contests",
              color: "text-primary",
            },
            {
              icon: <FaMoneyBillWave />,
              title: "Prize Money Paid",
              value: "$85,000+",
              desc: "And counting",
              color: "text-success",
            },
            {
              icon: <FaUsers />,
              title: "Active Participants",
              value: "12,000+",
              desc: "Creative minds",
              color: "text-warning",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-base-100/80 backdrop-blur rounded-lg p-8 shadow hover:shadow-lg transition"
            >
              <div className={`text-4xl mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <h4 className="text-sm uppercase tracking-wide opacity-70">
                {stat.title}
              </h4>
              <p className="text-3xl font-bold mt-2">{stat.value}</p>
              <p className="text-sm opacity-60 mt-1">{stat.desc}</p>
            </div>
          ))}
        </div>

        {/* Recent Winners */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-10 flex gap-2 justify-center">
            Recent Champions <span className="text-yellow-500"><GiTrophy /></span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {winners.map((winner, index) => (
              <div
                key={index}
                className="group bg-base-100/80 backdrop-blur rounded-lg p-8 shadow hover:shadow-xl transition"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="avatar mb-4">
                    <div className="w-20 rounded-full ring ring-primary/50 ring-offset-2 ring-offset-base-100">
                      <img src={winner.photoURL} alt={winner.name} />
                    </div>
                  </div>

                  <h4 className="font-semibold text-lg">
                    {winner.name}
                  </h4>
                  <p className="text-sm opacity-60">
                    {winner.category}
                  </p>

                  <span className="mt-4 inline-block px-4 py-1 rounded-full text-sm font-semibold bg-success/10 text-success">
                    Won {winner.prize}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">
            Your Name Could Be Here 🚀
          </h3>
          <p className="text-base-content/70 mb-8">
            Participate in contests, showcase your skills, and join the winners
            community.
          </p>
          <a
            href="/all-contests"
            className="btn btn-primary text-black px-8"
          >
            Explore Contests
          </a>
        </div>
      </div>
    </section>
  );
};

export default WinnerAdvertisement;

import { FaTrophy, FaMoneyBillWave, FaUsers } from "react-icons/fa";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Components/Loading";

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
    <section className="bg-base-200 py-16 my-20">
      <div className="max-w-[1440px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
            Our Winners Are Proof of Success
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Join Contesto, showcase your skills, and become our next champion.
          </p>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="stat bg-base-100 text-black rounded-xl shadow">
            <div className="stat-figure text-primary text-3xl">
              <FaTrophy />
            </div>
            <div className="stat-title">Total Winners</div>
            <div className="stat-value">1,250+</div>
            <div className="stat-desc">Across all contests</div>
          </div>

          <div className="stat bg-base-100 text-black rounded-xl shadow">
            <div className="stat-figure text-success text-3xl">
              <FaMoneyBillWave />
            </div>
            <div className="stat-title">Prize Money Paid</div>
            <div className="stat-value">$85,000+</div>
            <div className="stat-desc">And counting</div>
          </div>

          <div className="stat bg-base-100 text-black rounded-xl shadow">
            <div className="stat-figure text-warning text-3xl">
              <FaUsers />
            </div>
            <div className="stat-title">Active Participants</div>
            <div className="stat-value">12,000+</div>
            <div className="stat-desc">Creative minds</div>
          </div>
        </div>

        {/* Recent Winners */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {winners?.map((winner, index) => (
            <div key={index} className="card bg-base-100 text-black shadow-xl">
              <div className="card-body items-center text-center">
                <div className="avatar mb-4">
                  <div className="w-20 rounded-full ring ring-primary ring-offset-2">
                    <img src={winner.photoURL} alt={winner.name} />
                  </div>
                </div>
                <h3 className="font-bold text-lg">{winner.name}</h3>
                <p className="text-sm opacity-70">{winner.category}</p>
                <p className="font-semibold text-success mt-2">
                  Won {winner.prize}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="text-center mt-16"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <h3 className="text-2xl font-bold mb-4">
            You Could Be Our Next Winner 🚀
          </h3>
          <p className="mb-6 opacity-90">
            Participate today and turn your talent into rewards.
          </p>
          <a href="/all-contests" className="btn btn-primary text-black">
            Explore Contests
          </a>
        </div>
      </div>
    </section>
  );
};

export default WinnerAdvertisement;

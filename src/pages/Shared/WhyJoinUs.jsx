import { FaTrophy, FaUsers, FaRocket, FaShieldAlt } from "react-icons/fa";

const WhyJoinUs = () => {
  return (
    <section className="py-20 bg-base-100 relative overflow-hidden">
      {/* Decorative Blur */}


      <div className="max-w-[1440px] mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
            Why Choose Us
          </h2>
          <p className="text-base-content/70 max-w-2xl mx-auto">
            We provide a trusted platform where creativity meets opportunity.
            Compete, grow your skills, and get rewarded for your talent.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card */}
          {[
            {
              icon: <FaTrophy />,
              title: "Real Rewards",
              desc: "Win cash prizes, recognition, and featured spots by showcasing your talent.",
              color: "from-yellow-400 to-orange-500",
            },
            {
              icon: <FaUsers />,
              title: "Fair Judging",
              desc: "Every entry is judged transparently with clear rules and unbiased evaluation.",
              color: "from-sky-400 to-blue-600",
            },
            {
              icon: <FaRocket />,
              title: "Skill Growth",
              desc: "Participate in real challenges that push your creativity and level up skills.",
              color: "from-purple-400 to-pink-600",
            },
            {
              icon: <FaShieldAlt />,
              title: "Trusted Platform",
              desc: "Secure payments, verified creators, and a safe competition environment.",
              color: "from-green-400 to-emerald-600",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="card bg-base-200 hover:bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="card-body text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-5 rounded-full bg-linear-to-br ${item.color} flex items-center justify-center text-white text-2xl`}
                >
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-base-content/70">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default WhyJoinUs;

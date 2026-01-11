import { Link } from "react-router";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ayesha Rahman",
      role: "Contest Participant",
      message:
        "Contesto gave me a chance to showcase my skills and compete fairly. The platform is smooth and very user-friendly.",
    },
    {
      name: "Tanvir Ahmed",
      role: "Contest Winner",
      message:
        "Winning my first contest on Contesto boosted my confidence. The judging process felt transparent and professional.",
    },
    {
      name: "Mehedi Hasan",
      role: "Contest Creator",
      message:
        "Hosting contests on Contesto is easy and effective. The participant engagement exceeded my expectations.",
    },
    {
      name: "Abdul Alim",
      role: "Contest Creator",
      message:
        "inning my first contest on Contesto boosted my confidence. The judging process felt transparent and professional.",
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          What People Say About Contesto
        </h1>
        <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
          Hear from participants, winners, and creators who are part of the
          Contesto community.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="card bg-base-200 border border-base-300 rounded-xl"
          >
            <div className="card-body">
              <p className="text-base-content/80 italic">
                “{item.message}”
              </p>

              <div className="mt-6">
                <h4 className="font-semibold">
                  {item.name}
                </h4>
                <p className="text-sm text-base-content/60">
                  {item.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <h3 className="text-2xl font-semibold">
          Join the Contesto Community
        </h3>
        <p className="mt-2 text-base-content/70">
          Participate in contests, showcase your talent, and win exciting
          rewards.
        </p>
        <Link href="/all-contests" className="btn btn-primary text-black mt-6">
          Explore Contests
        </Link>
      </div>
    </section>
  );
};

export default Testimonials;

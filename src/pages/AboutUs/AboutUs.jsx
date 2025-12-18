import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16" data-aos="fade-up">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          About Us
        </h1>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          A platform where talent meets opportunity.
        </p>
      </div>

      {/* Who We Are */}
      <div className="card bg-base-100 shadow-md mb-10" data-aos="fade-up">
        <div className="card-body">
          <h2 className="card-title">🌍 Who We Are</h2>
          <p className="text-gray-600">
            We connect skilled participants with creators through
            fair and transparent contests.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {[
          ["🎯 Our Mission", "Empower talent through fair competition."],
          ["🔮 Our Vision", "Build a global skill-based community."],
        ].map(([title, desc], i) => (
          <div
            key={i}
            className="card bg-base-100 shadow-md"
            data-aos="fade-up"
            data-aos-delay={i * 100}
          >
            <div className="card-body">
              <h2 className="card-title">{title}</h2>
              <p className="text-gray-600">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <h2
        className="text-2xl font-semibold mb-6 text-center"
        data-aos="fade-up"
      >
        Why Choose Us?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          "✔ Transparent System",
          "✔ Approved Contests",
          "✔ Secure Submissions",
          "✔ Fair Winners",
          "✔ Easy Dashboard",
          "✔ Multiple Categories",
          "✔ Trusted Community",
          "✔ Skill-Based",
        ].map((item, i) => (
          <div
            key={i}
            className="card bg-base-100 shadow-md text-center"
            data-aos="fade-up"
            data-aos-delay={i * 80}
          >
            <div className="card-body">
              <p className="font-medium">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;

import React from "react";

const HowItWorks = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16" data-aos="fade-up">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          How It Works
        </h1>
        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
          A simple step-by-step guide for participants and creators.
        </p>
      </div>

      {/* Participants */}
      <section className="mb-20">
        <h2
          className="text-2xl font-semibold mb-8"
          data-aos="fade-up"
        >
          👤 For Participants
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["🔍", "Explore Contests", "Browse contests by category and prize."],
            ["📝", "Join a Contest", "Join before the deadline."],
            ["📤", "Submit Work", "Submit your project or link."],
            ["⏳", "Wait for Review", "Creators review after deadline."],
            ["🏆", "Winner Announced", "Winner selected fairly."],
            ["📊", "Track Results", "View result in dashboard."],
          ].map(([icon, title, desc], i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-md"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="card-body">
                <div className="text-4xl">{icon}</div>
                <h3 className="card-title">{title}</h3>
                <p className="text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Creators */}
      <section>
        <h2
          className="text-2xl font-semibold mb-8"
          data-aos="fade-up"
        >
          🎨 For Creators
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ["➕", "Create Contest", "Set rules and deadline."],
            ["✅", "Admin Approval", "Contest reviewed by admin."],
            ["📥", "Get Submissions", "Participants submit entries."],
            ["🏅", "Pick Winner", "Select winner after end."],
            ["🔒", "Complete Contest", "Contest locked."],
            ["⚖️", "Fair Play", "Transparent system."],
          ].map(([icon, title, desc], i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-md"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="card-body">
                <div className="text-4xl">{icon}</div>
                <h3 className="card-title">{title}</h3>
                <p className="text-gray-500">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;

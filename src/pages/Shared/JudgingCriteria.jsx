const JudgingCriteria = () => {
  const criteria = [
    {
      title: "Creativity & Innovation",
      weight: "40%",
      description:
        "How original, creative, and innovative the submission is compared to others.",
    },
    {
      title: "Technical Quality",
      weight: "30%",
      description:
        "Code quality, structure, performance, and correct use of technologies.",
    },
    {
      title: "Originality",
      weight: "20%",
      description:
        "Uniqueness of the idea and assurance that the work is not plagiarized.",
    },
    {
      title: "Presentation",
      weight: "10%",
      description:
        "Clarity, documentation, UI/UX, and overall presentation of the submission.",
    },
  ];

  return (
    <section className="max-w-[1440px] mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Judging Criteria
        </h1>
        <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
          All submissions on Contesto are evaluated using a fair, transparent,
          and structured scoring system.
        </p>
      </div>

      {/* Criteria Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {criteria.map((item, index) => (
          <div
            key={index}
            className="card bg-base-200 border border-base-300 rounded-xl"
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>
                <span className="badge badge-primary badge-outline">
                  {item.weight}
                </span>
              </div>
              <p className="text-base-content/70 mt-2">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Fair Play Section */}
      <div className="mt-16 bg-base-200 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-semibold">
          Fair Play & Transparency
        </h2>
        <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
          Contesto follows strict anti-plagiarism policies, blind judging (where
          applicable), and score-based evaluation to ensure a fair competition
          for everyone.
        </p>
      </div>
    </section>
  );
};

export default JudgingCriteria;

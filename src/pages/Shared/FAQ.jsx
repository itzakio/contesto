const faqData = [
  {
    id: 1,
    question: "How do I join a contest on Contesto?",
    answer:
      "Browse available contests, log in to your account, complete the entry payment if required, and submit your work before the contest deadline.",
  },
  {
    id: 2,
    question: "Is the contest entry fee refundable?",
    answer:
      "No, entry fees are non-refundable once a contest has started. Please review the contest rules carefully before participating.",
  },
  {
    id: 3,
    question: "How are winners selected?",
    answer:
      "Winners are selected based on predefined judging criteria such as creativity, originality, technical quality, and relevance to the contest guidelines.",
  },
  {
    id: 4,
    question: "When and how are winners announced?",
    answer:
      "Winners are announced after the submission deadline and are notified through the contest page and via registered email.",
  },
  {
    id: 5,
    question: "Is Contesto free to use?",
    answer:
      "Creating an account and browsing contests on Contesto is completely free. Some contests may require a small entry fee to participate.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="max-w-[1440px] mx-auto px-4 py-16">
      {/* Page Header */}
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold text-primary">
          Frequently Asked Questions
        </h1>
        <p className="mt-4 text-base-content/70 max-w-3xl mx-auto">
          Find clear answers about contests, participation, payments,
          submissions, and how Contesto works.
        </p>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        {faqData.map((faq) => (
          <div
            key={faq.id}
            className="collapse collapse-arrow bg-base-100 border border-base-300"
          >
            <input type="radio" name="my-accordion-2" defaultChecked />
            <div className="collapse-title font-semibold">{faq.question}</div>
            <div className="collapse-content text-accent">{faq.answer}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <h3 className="text-2xl font-semibold">Still have questions?</h3>
       
        <a href="#" className="btn btn-primary text-black mt-6">
          Contact Support
        </a>
      </div>
    </section>
  );
};

export default FAQ;

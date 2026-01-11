import { Link } from "react-router";

const HelpCenter = () => {
  return (
    <section className="min-h-screen bg-base-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Help Center
          </h1>
          <p className="mt-4 text-base-content/70">
            Need help? Find answers, learn how Contesto works, or contact our
            support team.
          </p>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-base-200 rounded-2xl p-8 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">
              Getting Started
            </h3>
            <p className="text-base-content/70 mb-4">
              Learn how to create an account, join contests, and submit entries.
            </p>
            <Link to="/terms&conditions" className="link link-primary font-medium">
              View Guides →
            </Link>
          </div>

          <div className="bg-base-200 rounded-2xl p-8 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">
              Payments & Prizes
            </h3>
            <p className="text-base-content/70 mb-4">
              Understand entry fees, refunds, and how winners receive prizes.
            </p>
            <Link to="/terms&conditions" className="link link-primary font-medium">
              Learn More →
            </Link>
          </div>

          <div className="bg-base-200 rounded-2xl p-8 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">
              Rules & Judging
            </h3>
            <p className="text-base-content/70 mb-4">
              Read contest rules, judging criteria, and fair play guidelines.
            </p>
            <Link to="/terms&conditions" className="link link-primary font-medium">
              Explore Rules →
            </Link>
          </div>
        </div>

        {/* Popular Questions */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Popular Questions
          </h2>

          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="collapse collapse-plus bg-base-200 rounded-xl">
              <input type="radio" name="help-faq" />
              <div className="collapse-title font-medium">
                How do I participate in a contest?
              </div>
              <div className="collapse-content text-base-content/70">
                Browse contests, log in, pay the entry fee if required, and
                submit your work before the deadline.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200 rounded-xl">
              <input type="radio" name="help-faq" />
              <div className="collapse-title font-medium">
                What happens if I miss the submission deadline?
              </div>
              <div className="collapse-content text-base-content/70">
                Once the deadline passes, submissions are closed and cannot be
                edited or added.
              </div>
            </div>

            <div className="collapse collapse-plus bg-base-200 rounded-xl">
              <input type="radio" name="help-faq" />
              <div className="collapse-title font-medium">
                How are winners selected?
              </div>
              <div className="collapse-content text-base-content/70">
                Winners are chosen based on the judging criteria listed on each
                contest page.
              </div>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-base-200 rounded-3xl p-10 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-base-content/70 mb-8">
            Our support team is here to help you with any issues or questions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="btn btn-primary text-black px-8"
            >
              Contact Support
            </Link>
            <Link
              to="/#faq"
              className="btn btn-outline btn-primary px-8"
            >
              Visit FAQ
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HelpCenter;

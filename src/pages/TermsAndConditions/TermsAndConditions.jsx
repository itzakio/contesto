const TermsAndConditions = () => {
  return (
    <section className="min-h-screen bg-base-100 py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-base-content/70">
            Please read these terms carefully before using Contesto.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-base-content/80 leading-relaxed">
          {/* 1 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using Contesto, you agree to be bound by these
              Terms & Conditions. If you do not agree with any part of these
              terms, you must not use the platform.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              2. Eligibility
            </h2>
            <p>
              You must be at least 18 years old to participate in contests on
              Contesto. By using the platform, you confirm that you meet this
              requirement.
            </p>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              3. User Accounts
            </h2>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials. Contesto is not liable for any loss or damage
              resulting from unauthorized access to your account.
            </p>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              4. Contest Participation
            </h2>
            <p>
              Each contest may have specific rules, deadlines, and judging
              criteria. By participating, you agree to comply with all contest
              rules and submit original work.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              5. Payments & Fees
            </h2>
            <p>
              Some contests require an entry fee. All payments are
              non-refundable unless explicitly stated otherwise. Contesto uses
              secure payment gateways for all transactions.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              6. Prizes & Winners
            </h2>
            <p>
              Winners are selected based on the contest’s judging criteria.
              Prize distribution timelines may vary depending on the contest
              organizer and payment method.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              7. Prohibited Activities
            </h2>
            <p>
              Users must not engage in fraudulent activity, plagiarism, abuse,
              or any behavior that disrupts the integrity of the platform.
              Violations may result in account suspension or termination.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              8. Intellectual Property
            </h2>
            <p>
              All platform content, including branding and design, belongs to
              Contesto. Users retain ownership of their submissions but grant
              Contesto permission to display them for contest-related purposes.
            </p>
          </div>

          {/* 9 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              9. Limitation of Liability
            </h2>
            <p>
              Contesto is not responsible for any indirect, incidental, or
              consequential damages arising from the use of the platform.
            </p>
          </div>

          {/* 10 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              10. Changes to Terms
            </h2>
            <p>
              Contesto reserves the right to update these Terms & Conditions at
              any time. Continued use of the platform indicates acceptance of
              the updated terms.
            </p>
          </div>

          {/* 11 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              11. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms & Conditions, please
              contact us through the Help Center or Contact page.
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 text-center text-sm text-base-content/60">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;

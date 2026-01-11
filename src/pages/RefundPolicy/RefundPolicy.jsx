const RefundPolicy = () => {
  return (
    <section className="min-h-screen bg-base-100 py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Refund Policy
          </h1>
          <p className="mt-4 text-base-content/70">
            Please read this policy carefully before making any payments on
            Contesto.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-base-content/80 leading-relaxed">
          {/* 1 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              1. General Policy
            </h2>
            <p>
              Contesto is a contest-based platform. All entry fees are generally
              non-refundable once a contest has started, as fees contribute to
              prize pools, judging, and platform operations.
            </p>
          </div>

          {/* 2 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              2. Eligible Refund Cases
            </h2>
            <p>
              Refunds may be considered only in the following situations:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>The contest is cancelled by the organizer</li>
              <li>Payment was charged multiple times due to a technical error</li>
              <li>The contest rules were significantly changed after payment</li>
            </ul>
          </div>

          {/* 3 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              3. Non-Refundable Situations
            </h2>
            <p>
              Refunds will not be provided in the following cases:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>You did not win the contest</li>
              <li>You missed the submission deadline</li>
              <li>You voluntarily withdrew from the contest</li>
              <li>Your submission was disqualified for rule violations</li>
            </ul>
          </div>

          {/* 4 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              4. Refund Request Process
            </h2>
            <p>
              To request a refund, please contact our support team within
              <strong> 7 days </strong>
              of the payment date. Provide your contest ID, payment reference,
              and a brief explanation of the issue.
            </p>
          </div>

          {/* 5 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              5. Refund Processing Time
            </h2>
            <p>
              Approved refunds will be processed within
              <strong> 7–10 business days </strong>
              and returned through the original payment method used.
            </p>
          </div>

          {/* 6 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              6. Chargebacks & Disputes
            </h2>
            <p>
              Initiating a chargeback without contacting Contesto support first
              may result in account suspension. We encourage users to resolve
              payment issues through our official support channels.
            </p>
          </div>

          {/* 7 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              7. Policy Updates
            </h2>
            <p>
              Contesto reserves the right to update this Refund Policy at any
              time. Any changes will be effective immediately upon posting on
              this page.
            </p>
          </div>

          {/* 8 */}
          <div>
            <h2 className="text-2xl font-semibold mb-2">
              8. Contact Support
            </h2>
            <p>
              If you have any questions regarding refunds, please reach out to
              us through the Help Center or Contact page.
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

export default RefundPolicy;

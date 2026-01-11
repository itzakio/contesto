import { Clock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    // Simulate API request
    setTimeout(() => {
      setLoading(false);
      toast.success(
        "Message sent successfully! We’ll get back to you soon."
      );
      form.reset();
    }, 1200);
  };

  return (
    <section className="min-h-screen bg-base-100 py-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Contact Us
          </h1>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            Have a question, feedback, or need help?  
            We’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="text-primary text-xl">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="opacity-80">support@contesto.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-primary text-xl">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone</h3>
                <p className="opacity-80">+880 1909 129 196</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-primary text-xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Location</h3>
                <p className="opacity-80">Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="alert bg-base-200 flex items-center gap-1 ">
               <Clock size={16} className="mb-1"/><span >
                Our support team usually responds within 24 hours.
              </span>
            </div>
          </div>

          {/* Contact Form */}
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                Send us a message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">
                    <span className="label-text">Your Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your name"
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Email Address</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Message</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="Write your message here..."
                    className="textarea textarea-bordered w-full"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full text-black"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 text-sm opacity-60">
          We value your feedback and questions — thank you for choosing Contesto.
        </div>
      </div>
    </section>
  );
};

export default Contact;

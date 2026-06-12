import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import heroImage from "../assets/Shores-img/img4.jpeg";
export default function Contact() {
  const formRef = useRef();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      );

      setSuccess("Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error(error);
      setSuccess("Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            text-white
            text-shadow-lg
          "
        >
          <h1
            className="
              text-4xl
                  md:text-7xl
                  font-serif
            "
          >
              Contact Us
          </h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            {/* Left Card */}

            <div className="bg-[#1d293f] text-white p-20 rounded-2xl">
              <h2 className="text-4xl font-serif mb-8">
                Let's Start a Conversation
              </h2>

              <div className="space-y-8">
                <div>\
                  <h3 className="font-semibold mb-2">Phone</h3>

                  <p>+1 (850) 866 2077</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Email</h3>

                  <p>condorentalpcb@aol.com</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Address</h3>

                  <p>
                   5115 Gulf Dr, Panama City, FL, United States, Florida
                  </p>
                </div>

                {/* <div>
                  <h3 className="font-semibold mb-2">Response Time</h3>

                  <p>Typically within 24 hours</p>
                </div> */}
              </div>
            </div>

            {/* Right Form */}

            <div className="bg-[#f8f8f8] p-8 md:p-12 rounded-2xl shadow-lg">
              <h2 className="text-4xl font-serif mb-8">Send a Message</h2>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    required
                    className="
        w-full
        bg-white
        border
        border-gray-200
        rounded-xl
        px-5
        py-4
        focus:outline-none
        focus:ring-2
        focus:ring-[#4ea5a5]
      "
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    className="
        w-full
        bg-white
        border
        border-gray-200
        rounded-xl
        px-5
        py-4
        focus:outline-none
        focus:ring-2
        focus:ring-[#4ea5a5]
      "
                  />

                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    className="
        w-full
        bg-white
        border
        border-gray-200
        rounded-xl
        px-5
        py-4
        focus:outline-none
        focus:ring-2
        focus:ring-[#4ea5a5]
      "
                  />

                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    required
                    className="
        w-full
        bg-white
        border
        border-gray-200
        rounded-xl
        px-5
        py-4
        focus:outline-none
        focus:ring-2
        focus:ring-[#4ea5a5]
      "
                  />
                </div>

                <textarea
                  name="message"
                  rows="7"
                  placeholder="Tell us about your vacation plans..."
                  required
                  className="
      w-full
      bg-white
      border
      border-gray-200
      rounded-xl
      px-5
      py-4
      resize-none
      focus:outline-none
      focus:ring-2
      focus:ring-[#4ea5a5]
    "
                />

                {success && (
                  <p className="text-center text-green-600 font-medium">
                    {success}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="
      w-full
      bg-[#4ea5a5]
      hover:bg-[#3f9191]
      text-white
      py-4
      rounded-xl
      font-semibold
      tracking-wide
      transition-all
      duration-300
    "
                >
                  {loading ? "SENDING..." : "SEND MESSAGE"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

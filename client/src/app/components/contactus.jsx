"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { contactApi } from "@/api/api";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await contactApi(formData);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setSubmitStatus("");
      }, 5000);
    }, 2000);
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Contact info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2
            className="text-4xl font-bold text-white"
            style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }}
          >
            Get in <span className="grad-word">Touch</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Have a project in mind or want to collaborate? Reach out and we'll
            respond within 24 hours.
          </p>
          <div className="space-y-4">
            <p style={{ fontFamily: "'ClashDisplay-Bold', sans-serif" }} className="text-2xl font-bold mb-8">
              <span className="grad-word">TxShield</span>@proton.me
            </p>
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-lg bg-transparent border border-gray-700 focus:border-white focus:ring-1 focus:ring-white/20 text-white placeholder-gray-500 transition-all duration-300"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-lg bg-transparent border border-gray-700 focus:border-white focus:ring-1 focus:ring-white/20 text-white placeholder-gray-500 transition-all duration-300"
                  placeholder="Email Address"
                />
              </div>
            </div>

            <div>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 rounded-lg bg-transparent border border-gray-700 focus:border-white focus:ring-1 focus:ring-white/20 text-white placeholder-gray-500 transition-all duration-300 resize-none"
                placeholder="Your Message"
              ></textarea>
            </div>

            <div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 px-6 rounded-lg font-medium transition-all duration-300 relative overflow-hidden ${
                  isSubmitting
                    ? "bg-gray-700 cursor-not-allowed text-gray-300"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
              >
                <div className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-3" />
                      Send Message
                    </>
                  )}
                </div>
              </motion.button>
            </div>
          </form>

          <AnimatePresence>
            {submitStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-100 text-center"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  <span>Message sent successfully!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

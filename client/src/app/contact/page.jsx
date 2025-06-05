"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";
import { contactApi } from "@/api/api";
import Header from "../components/header";

export default function ContactPage() {
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

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitStatus("");
      }, 5000);
    }, 2000);
  };

  return (
    <>
    <Header/>
      <div className="min-h-screen bg-black py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
              style={{
                fontFamily: "'Orbitron', monospace",
                textShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
              }}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              LET&apos;S CONNECT
            </motion.h1>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-zinc-900 rounded-3xl p-8 border border-yellow-500/30 shadow-2xl">
              <h2
                className="text-4xl font-bold text-white mb-2 text-center"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Send Us a Message
              </h2>
              <p
                className="text-gray-400 mb-8 text-center"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Tell us about your project and we&apos;ll get back to you within
                24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-white mb-3"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-xl bg-black border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 text-white placeholder-gray-500 transition-all duration-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-white mb-3"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-6 py-4 rounded-xl bg-black border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 text-white placeholder-gray-500 transition-all duration-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-white mb-3"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-xl bg-black border border-gray-700 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/30 text-white placeholder-gray-500 transition-all duration-300 resize-none"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                    placeholder="Tell us about your project, goals, and how we can help..."
                  ></textarea>
                </div>

                <div className="pt-4">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-5 px-8 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg relative overflow-hidden ${
                      isSubmitting
                        ? "bg-gray-600 cursor-not-allowed text-gray-300"
                        : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-400 hover:to-yellow-500 hover:shadow-2xl hover:shadow-yellow-500/25"
                    }`}
                    style={{ fontFamily: "'Orbitron', monospace" }}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          SENDING MESSAGE...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-3" />
                          SEND MESSAGE
                        </>
                      )}
                    </div>
                  </motion.button>
                </div>
              </form>

              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="mt-6 p-6 bg-yellow-500/10 border border-yellow-500/50 rounded-xl text-yellow-100 text-center"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-5 h-5 text-black"
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
                      </div>
                      <span
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Message Sent Successfully!
                      </span>
                    </div>
                    <p
                      className="text-gray-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Thank you for reaching out. We&apos;ll get back to you
                      within 24 hours.
                    </p>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="mt-6 p-6 bg-red-500/10 border border-red-500/50 rounded-xl text-red-100 text-center"
                  >
                    <div className="flex items-center justify-center mb-2">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </div>
                      <span
                        className="text-lg font-bold text-white"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Oops! Something went wrong
                      </span>
                    </div>
                    <p
                      className="text-gray-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      Please try again or contact us directly via email.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import assets from "../assets/assets";
import Title from "./Title";
import toast from "react-hot-toast";
import { motion } from "motion/react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs = () => {
  const [result, setResult] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setResult(true);
    const submitData = new FormData();
    submitData.append("access_key", import.meta.env.VITE_WEB3_FORM_KEY || "");
    submitData.append("name", formData.name);
    submitData.append("email", formData.email);
    submitData.append("message", formData.message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Thank you for your submission!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setResult(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
      id="contact-us"
      className="flex flex-col items-center gap-7 px-4 sm:px-12 lg:px-24 xl:px-40 pt-30 text-gray-700 dark:text-white"
    >
      <Title
        title="Reach out to us"
        desc="Let’s create a website and digital presense that moves your business forward."
      />

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        viewport={{ once: true }}
        onSubmit={onSubmit}
        className="grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full"
      >
        <div>
          <p className="mb-2 text-sm font-medium">Your Name</p>
          <div
            className={`flex pl-3 rounded-lg border ${
              errors.name
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <img src={assets.person_icon} alt="icon" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter Your Name"
              className="w-full p-3 text-sm outline-none bg-transparent"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <p className="mb-2 text-sm font-medium">Email id</p>
          <div
            className={`flex pl-3 rounded-lg border ${
              errors.email
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-600"
            }`}
          >
            <img src={assets.email_icon} alt="icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter Email id"
              className="w-full p-3 text-sm outline-none bg-transparent"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <p className="mb-2 font-medium text-sm">Message</p>
          <textarea
            rows={8}
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell us about your business and let us handle the rest"
            className={`w-full p-3 text-sm outline-none rounded-lg border bg-transparent ${
              errors.message
                ? "border-red-500"
                : "border-gray-300 dark:border-gray-800"
            }`}
          />
          {errors.message && (
            <p className="text-red-500 text-xs mt-1">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={result}
          className={`w-max flex gap-2 text-white text-sm px-10 py-3 rounded-full transition-all ${
            result
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary cursor-pointer hover:scale-103"
          }`}
        >
          {result ? (
            "Loading..."
          ) : (
            <>
              Submit <img src={assets.arrow_icon} alt="icon" className="w-4" />
            </>
          )}
        </button>
      </motion.form>
    </motion.div>
  );
};

export default ContactUs;

import React from "react";
// Uncomment these if you're using icons
// import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Contact Us
        </h2>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Have questions about movie showtimes, bookings, or our theaters? We're
          here to help!
        </p>
      </div>

      {/* Contact Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {/* Phone Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full mb-4">
            {/* <FaPhone className="text-blue-600 text-xl dark:text-blue-300" /> */}
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Phone
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            General Inquiries:{" "}
            <a
              href="tel:+11234567890"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              +1 (123) 456-7890
            </a>
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Group Bookings:{" "}
            <a
              href="tel:+11234567891"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              +1 (123) 456-7891
            </a>
          </p>
        </div>

        {/* Email Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full mb-4">
            {/* <FaEnvelope className="text-green-600 text-xl dark:text-green-300" /> */}
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Email
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            <a
              href="mailto:support@movietix.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              support@movietix.com
            </a>
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            <a
              href="mailto:business@movietix.com"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              business@movietix.com
            </a>
          </p>
        </div>

        {/* Location Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full mb-4">
            {/* <FaMapMarkerAlt className="text-red-600 text-xl dark:text-red-300" /> */}
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Location
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            123 Cinema Street
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Movieville, MV 12345
          </p>
        </div>

        {/* Hours Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-full mb-4">
            {/* <FaClock className="text-yellow-600 text-xl dark:text-yellow-300" /> */}
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Hours
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            Monday-Friday: 10:00 AM - 11:00 PM
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-1">
            Weekends: 9:00 AM - 12:30 AM
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Holidays: Special hours may apply
          </p>
        </div>
      </div>

      {/* Contact Form and Social Media */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        {/* <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Send Us a Message
          </h3>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your name"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your email"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Subject
              </label>
              <select
                id="subject"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a topic</option>
                <option value="booking">Booking Issue</option>
                <option value="refund">Refund Request</option>
                <option value="feedback">Feedback/Suggestion</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                placeholder="Your message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>

        
        <div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Connect With Us
            </h3>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800"
              >
                <FaFacebook className="text-3xl" />
              </a>
              <a
                href="#"
                className="text-blue-400 dark:text-blue-300 hover:text-blue-600"
              >
                <FaTwitter className="text-3xl" />
              </a>
              <a
                href="#"
                className="text-pink-600 dark:text-pink-400 hover:text-pink-800"
              >
                <FaInstagram className="text-3xl" />
              </a>
            </div>
          </div> */}

        <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden h-64">
          <iframe
            title="Cinema Location"
            width="100%"
            height="100%"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60776.051544825576!2d72.34015150505637!3d23.58933472071631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395c422caf789ef5%3A0x170bbc90b8be8bdc!2sMehsana%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1744863024675!5m2!1sen!2sin"
          ></iframe>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Contact;

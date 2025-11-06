import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="border-t pt-8">
      {/* Header */}
      <div className="text-2xl text-center">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      {/* Contact Info + Image Section */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        {/* Left Image */}
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Right Info */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Have questions or need help? We’d love to hear from you!  
            Whether you’re looking for product details, shipping information, or
            support with your order, our friendly team is here to assist.
          </p>

          <p>
            You can reach us through the following contact details or fill out
            the form below. We typically respond within 24 hours.
          </p>

          <div>
            <b className="text-gray-800">Our Office</b>
            <p>Forever Store Pvt. Ltd.</p>
            <p>123 Innovation Street, Mumbai, India</p>
            <p>Email: support@foreverstore.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="my-10">
        <div className="text-2xl text-center mb-8">
          <Title text1={"GET"} text2={"IN TOUCH"} />
        </div>

        <form
          className="flex flex-col gap-4 w-[90%] sm:max-w-[500px] m-auto text-gray-600"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Your Name"
            required
            className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            required
            className="border border-gray-300 rounded py-2 px-3.5 w-full focus:outline-none focus:border-black"
          ></textarea>

          <button
            type="submit"
            className="bg-black text-white py-2.5 rounded hover:bg-gray-800 transition-all"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Explore Jobs Section */}
      <div className="mt-20 mb-16 text-center">
        <Title text1={"EXPLORE"} text2={"CAREERS"} />
        <div className="max-w-2xl m-auto mt-6 text-gray-600">
          <p>
            Want to be part of something great? At <b>Forever</b>, we’re always
            looking for creative, passionate, and driven individuals to join our
            growing team. Whether you’re into technology, marketing, customer
            support, or product design — there’s a place for you here.
          </p>

          <p className="mt-4">
            Explore open positions and start your journey with us today!
          </p>
        </div>

        <button
          onClick={() => window.open("/careers", "_self")}
          className="mt-8 bg-black text-white px-8 py-3 text-sm rounded hover:bg-gray-800 transition-all"
        >
          Explore Jobs
        </button>
      </div>
    </div>
  );
};

export default Contact;

import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="border-t pt-8">
      {/* About Section Header */}
      <div className="text-2xl text-center">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      {/* About Section Content */}
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          src={assets.about_img}
          alt="About Forever"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>

          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectations—from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>

      {/* WHY CHOOSE US SECTION */}
      <div className="text-2xl text-center py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        {/* Quality Assurance */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We meticulously select and vet each product to ensure it meets our
            high standards for quality, durability, and reliability. Your
            satisfaction and trust are our top priorities.
          </p>
        </div>

        {/* Convenience */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1">
          <b>Convenience:</b>
          <p className="text-gray-600">
            With our user-friendly interface and hassle-free checkout process,
            shopping with Forever is simple, quick, and secure—from start to
            finish.
          </p>
        </div>

        {/* Customer Service */}
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 flex-1">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our dedicated customer service team is always here to assist you
            with any queries or concerns, ensuring your experience is as smooth
            as possible.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default About;

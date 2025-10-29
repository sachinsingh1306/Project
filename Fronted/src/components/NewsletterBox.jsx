import React from "react";

const NewsletterBox = () => {
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe Now & Get 20% OFF
      </p>
      <p className="text-gray-400 mt-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>

      <form className="w-full sm">
        <input className="w-full sm:flex-1 outline-none" type="email" placeholder="Enter Your Email" />
        <button className="bg-black text-white text-xs px-10 py-4" type="submit">SUBSCRIBE</button>

      </form>
    </div>
  );
};

export default NewsletterBox;

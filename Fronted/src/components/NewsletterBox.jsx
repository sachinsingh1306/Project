import React from "react";

const NewsletterBox = () => {

  const onSubmitHandler = () => {
    event.preventDefault();
  }
  return (
    <div className="text-center my-16">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe Now & Get 20% OFF
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>

      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto border border-gray-300 rounded overflow-hidden mt-6">
        <input
          className="w-full flex-1 px-4 py-3 outline-none text-sm"
          type="email"
          placeholder="Enter Your Email"
          required
        />
        <button
          className="bg-black text-white text-xs px-8 py-3 hover:bg-gray-800 transition-all rounded mx-1"
          type="submit"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;

import React from "react";

const Title = ({ text1, text2 }) => {
  return (
    <h2 className="text-center font-semibold text-gray-800">
      {text1} <span className="text-red-500">{text2}</span>
    </h2>
  );
};

export default Title;

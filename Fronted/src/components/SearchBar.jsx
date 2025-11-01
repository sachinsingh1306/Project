import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")){
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  
 return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center transition-all duration-300 ease-in-out">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 gap-2 rounded-full mt-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-transparent text-sm px-2"
          type="text"
          placeholder="Search for products..."
        />
        <img className="w-4" src={assets.search_icon} alt="Search" />
      </div>

      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer ml-3"
        src={assets.cross_icon}
        alt="Close"
      />
    </div>
  ) : null;
 
};

export default SearchBar;

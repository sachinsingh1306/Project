import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove/${id}`,
        {}, // empty body
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Products</h2>

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-[1fr_2fr_2fr_1fr_1fr] gap-4 py-2 border-b-2 border-gray-200 font-medium text-gray-700">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-4 mt-2">
        {list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[1fr_2fr_2fr_1fr_1fr] items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition"
          >
            <img
              src={item.image[0]}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <p className="font-medium">{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-500 font-semibold hover:text-red-700 transition"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;

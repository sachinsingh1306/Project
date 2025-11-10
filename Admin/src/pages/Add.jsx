// src/pages/Add.jsx
import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("image1", image1);
      formData.append("image2", image2);
      formData.append("image3", image3);
      formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        alert("Product added successfully!"); // ✅ show alert

        // ✅ clear the form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubCategory("Topwear");
        setBestseller(false);
        setSizes([]);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        alert("Failed to add product: " + response.data.message);
      }

      console.log(response.data);
      
    } catch (error) {
      console.error("Add Product Error:", error);
      alert(
        "Error adding product: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-3 bg-white p-8 rounded-2xl shadow-md max-w-3xl mx-auto my-10"
    >
      {/* Upload Images */}
      <div>
        <p className="mb-2 font-medium text-gray-700">Upload Image</p>
        <div className="flex gap-2 flex-wrap">
          {[image1, image2, image3, image4].map((img, i) => (
            <label key={i} htmlFor={`image${i + 1}`}>
              <img
                className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg object-cover cursor-pointer hover:border-pink-400 transition-all"
                src={img ? URL.createObjectURL(img) : assets.upload_area}
                alt=""
              />
              <input
                type="file"
                id={`image${i + 1}`}
                hidden
                required={i === 0}
                onChange={(e) => {
                  if (i === 0) setImage1(e.target.files[0]);
                  if (i === 1) setImage2(e.target.files[0]);
                  if (i === 2) setImage3(e.target.files[0]);
                  if (i === 3) setImage4(e.target.files[0]);
                }}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full">
        <p className="mb-2 text-gray-700 font-medium">Product Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          required
          placeholder="Type here..."
          className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      {/* Product Description */}
      <div className="w-full">
        <p className="mb-2 text-gray-700 font-medium">Product Description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          required
          placeholder="Type here..."
          className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
        ></textarea>
      </div>

      {/* Category & Subcategory */}
      <div className="flex flex-col sm:flex-row gap-3 w-full sm:gap-8">
        <div>
          <p className="mb-2 text-gray-700 font-medium">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-gray-700 font-medium">Sub Category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
      </div>

      {/* Price */}
      <div className="w-full">
        <p className="mb-2 text-gray-700 font-medium">Product Price</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          type="number"
          required
          placeholder="$"
          className="w-full max-w-md border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
        />
      </div>

      {/* Sizes */}
      <div className="w-full">
        <p className="mb-2 text-gray-700 font-medium">Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-3 py-1 cursor-pointer rounded-md border ${
                sizes.includes(size)
                  ? "bg-pink-100 border-pink-400"
                  : "bg-slate-200 border-gray-300"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      {/* Bestseller */}
      <div className="flex gap-2 mt-2 items-center">
        <input
          onChange={() => setBestseller((prev) => !prev)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-400"
        />
        <label
          className="cursor-pointer text-gray-700 font-medium"
          htmlFor="bestseller"
        >
          Add to Bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-2 rounded-lg transition-all"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;

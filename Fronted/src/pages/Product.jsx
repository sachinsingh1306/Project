import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // Fetch product by ID
  const fetchProductData = () => {
    if (products.length > 0) {
      products.forEach((item) => {
        if (item._id == productId) {
          setProductData(item);
          setImage(item.image[0]); // ✅ Default main image
          console.log("Matched product:", item);
        }
      });
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  // Loading state
  if (!productData) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* =================== PRODUCT DETAILS SECTION =================== */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          {/* Thumbnail Images */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between gap-2 sm:gap-3 max-h-[500px]">
            {productData.image.map((item, index) => (
              <img
                key={index}
                onClick={() => setImage(item)}
                src={item}
                alt={`Product-${index}`}
                className={`w-[22%] sm:w-full sm:h-[120px] flex-shrink-0 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  image === item
                    ? "border-orange-500 opacity-100"
                    : "border-gray-200 hover:border-orange-400 opacity-80"
                }`}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%] bg-gray-50 flex items-center justify-center rounded-lg border">
            <img
              src={image}
              alt="full-image"
              className="w-full max-h-[500px] object-contain rounded-lg transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Star Ratings */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className="pl-2 text-sm text-gray-600">(122 reviews)</p>
          </div>

          {/* Price */}
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          {/* Description */}
          <p className="mt-5 text-gray-500 w-4/5">{productData.description}</p>

          {/* Select Size */}
          <div className="flex flex-col gap-4 my-8">
            <p className="font-medium">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 transition-all duration-200 ${
                    item === size
                      ? "border-orange-500 bg-orange-100"
                      : "hover:border-orange-400"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            className="bg-black text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-all duration-200"
            onClick={()=> addToCart(productData._id,size)}
            >
            Add to Cart
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>✅ 100% Original Product</p>
            <p>💵 Cash on Delivery available.</p>
            <p>↩️ Easy return & exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* =================== DESCRIPTION & REVIEWS =================== */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm bg-gray-100">Description</b>
          <p className="border px-5 py-3 text-sm cursor-pointer">
            Reviews (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-4 text-sm text-gray-500">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta,Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus dolorem expedita voluptatum voluptatem. Dolor nihil ducimus eos earum accusamus ea id maxime culpa, est dolore commodi, mollitia impedit. Minus maxime doloribus porro ducimus, dicta illo earum id distinctio beatae obcaecati!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            ipsa officia rem eveniet adipisci officiis consectetur, eaque beatae
            ullam veniam!
          </p>
        </div>
      </div>

      {/* =================== RELATED PRODUCTS =================== */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;

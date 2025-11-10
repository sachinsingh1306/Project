import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Select product size");
      return;
    }

    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);
    toast.success("Product added to cart");

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`, // <-- comma added
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    if (quantity <= 0) delete cartData[itemId][size];
    else cartData[itemId][size] = quantity;
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let total = 0;
    for (const id in cartItems) {
      const product = products.find((p) => p._id === id);
      if (!product) continue;
      for (const size in cartItems[id]) {
        total += product.price * cartItems[id][size];
      }
    }
    return total;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      console.log("Fetched products:", response.data);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    getProductsData,
    token,
    setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;

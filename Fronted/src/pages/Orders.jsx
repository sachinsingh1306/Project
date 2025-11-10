import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  // ✅ Load user orders from backend
  const loadOrderData = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        const ordersArray = response.data.orders || [];

        const allOrderItems = [];
        ordersArray.forEach((order) => {
          order.items.forEach((item) => {
            allOrderItems.push({
              ...item.itemId, // ✅ name, price, image (from populate)
              quantity: item.quantity,
              size: item.size,
              status: order.status || "Order Placed",
              paymentMethod: order.paymentMethod || "COD",
              date: order.date,
            });
          });
        });

        setOrderData(allOrderItems.reverse());
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  // ✅ Fetch once when token changes
  useEffect(() => {
    loadOrderData();
  }, [token, backendUrl]);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-8">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div>
        {orderData.length === 0 ? (
          <p className="text-gray-500">No orders found.</p>
        ) : (
          orderData.map((item, index) => (
            <div
              key={index}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              {/* 🛍️ Product Info */}
              <div className="flex items-start gap-6 text-sm">
                <img
                  className="w-16 sm:w-20 h-20 object-cover rounded border"
                  src={
                    item.image?.[0]?.startsWith("http")
                      ? item.image[0]
                      : `${backendUrl}/${item.image?.[0] || "placeholder.jpg"}`
                  }
                  alt={item.name || "Product"}
                  onError={(e) => (e.target.src = "/placeholder.jpg")}
                />

                <div>
                  <p className="sm:text-base font-medium">{item.name}</p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Qty: {item.quantity || 1}</p>
                    <p>Size: {item.size || "M"}</p>
                  </div>

                  <p className="mt-2 text-sm">
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </p>

                  <p className="mt-2 text-sm">
                    Payment:{" "}
                    <span className="text-gray-400">
                      {item.paymentMethod?.toUpperCase() || "COD"}
                    </span>
                  </p>
                </div>
              </div>

              {/* 🚚 Status + Track */}
              <div className="md:w-1/2 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      item.status === "Delivered"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  ></div>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>

                <button
                  onClick={() =>
                    alert(
                      `Tracking not implemented yet.\nOrder: ${item.name}`
                    )
                  }
                  className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  // Fetch user orders from backend
  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/list`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { token } }
      );

      // Update local state
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success("Order status updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order, idx) => (
          <div key={idx} className="border p-4 mb-4 rounded shadow-sm">
            {/* Order header */}
            <div className="flex justify-between mb-2">
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.date).toLocaleDateString("en-GB")}
              </p>
            </div>

            {/* Address */}
            {order.address && (
              <div className="mb-2">
                <p>
                  <strong>Customer:</strong> {order.address.firstName}{" "}
                  {order.address.lastName}
                </p>
                <p>
                  <strong>Street:</strong> {order.address.street}
                </p>
                <p>
                  <strong>City/State/ZIP:</strong> {order.address.city},{" "}
                  {order.address.state}, {order.address.zip}
                </p>
                <p>
                  <strong>Phone:</strong> {order.address.phone}
                </p>
              </div>
            )}

            {/* Items */}
            <div className="mb-2">
              {order.items.map((item, i) => {
                const imageUrl =
                  item.itemId?.image?.[0]?.startsWith("http")
                    ? item.itemId.image[0]
                    : `${backendUrl}/${item.itemId?.image?.[0]}`;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 border-t pt-2 mt-2"
                  >
                    <img
                      src={imageUrl}
                      alt={item.itemId?.name || "Product"}
                      className="w-16 h-16 object-cover rounded"
                      onError={(e) => (e.target.src = "/no-image.png")}
                    />
                    <div>
                      <p>{item.itemId?.name || "Unnamed Product"}</p>
                      <p>
                        {currency}
                        {item.itemId?.price || 0} × {item.quantity}{" "}
                        {item.size && <span>({item.size})</span>}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment & Amount */}
            <div className="mb-2">
              <p>
                <strong>Items:</strong> {order.items.length}
              </p>
              <p>
                <strong>Method:</strong> {order.paymentMethod.toUpperCase()}
              </p>
              <p>
                <strong>Payment:</strong> {order.payment ? "Done" : "Pending"}
              </p>
              <p>
                <strong>Amount:</strong> {currency}
                {order.amount}
              </p>
            </div>

            {/* Status dropdown */}
            <div className="mb-2">
              <label>
                <strong>Status: </strong>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="border px-2 py-1 rounded"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </label>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;

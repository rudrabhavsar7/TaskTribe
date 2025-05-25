import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const AdminOrders = () => {
  const { axios, toast } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/admin");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Failed to fetch orders");
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const { data } = await axios.put(`/api/order/admin/${orderId}/status`, {
        status: newStatus,
      });

      if (data.success) {
        toast.success("Status updated");
        fetchOrders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders (Admin)</h2>

      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order._id} className="border p-4 rounded shadow bg-white">
            <p><strong>Order ID:</strong> {order._id}</p>
            <p><strong>Customer:</strong> {order.customerId?.name}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Amount:</strong> ₹{order.amount}</p>

            <div className="flex items-center gap-2 mt-2">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="border px-3 py-1 rounded text-black"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOrders;

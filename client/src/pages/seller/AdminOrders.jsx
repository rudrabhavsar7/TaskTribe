import React, { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

const AdminOrders = () => {
  const { axios, toast } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/order/admin`);
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
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/order/admin/${orderId}/status`,
        { status: newStatus }
      );
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

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-10">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
        All Orders (Admin View)
      </h2>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 p-5 rounded-xl shadow-sm bg-white space-y-4"
          >
            <div className="flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
              <div>
                <p className="text-sm text-gray-500">Order ID:</p>
                <p className="font-medium break-all">{order._id}</p>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium w-fit ${getStatusColor(order.status)}`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-1">
              <p>
                <strong>Customer:</strong> {order.customerId?.name || "N/A"}
              </p>

              <div>
                <strong>Items:</strong>
                <ul className="list-disc list-inside ml-2 text-gray-700">
                  {order.items.map((item, idx) => (
                    <li key={idx}>{item.serviceName}</li>
                  ))}
                </ul>
              </div>

              <p>
                <strong>Total Amount:</strong> ₹{order.amount}
              </p>
            </div>

            <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <label htmlFor={`status-${order._id}`} className="font-medium">
                Update Status:
              </label>
              <select
                id={`status-${order._id}`}
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="border border-gray-300 px-3 py-1 rounded text-sm"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;

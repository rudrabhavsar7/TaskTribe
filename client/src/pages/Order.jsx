import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { axios, toast, user } = useAppContext();
  const [filterStatus, setFilterStatus] = useState("All");

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${BACKEND_URL}/api/order/user/${user._id}`
      );
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    if (user?._id) {
      getOrders();
    }
  }, [user]);

  const filteredOrders = orders.filter((order) =>
    filterStatus === "All" ? true : order.status === filterStatus
  );

  return (
    <div className="mt-20 flex flex-col lg:flex-row h-[calc(100vh-80px)]">
      {/* Left - Static Heading */}
      <div className="flex items-center p-10 mt-4 justify-center lg:w-1/3 w-full bg-black text-white border-0 rounded-br-2xl">
        <h2 className="text-4xl md:text-5xl font-bold">My Orders</h2>
      </div>

      {/* Right - Scrollable Orders */}
      <div className="lg:w-2/3 w-full px-6 py-8 overflow-y-auto bg-gray-50">
        {/* Filter Selector at Top Right */}
        <div className="flex justify-end mb-6">
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">
            No {filterStatus !== "All" ? filterStatus.toLowerCase() : ""} orders found.
          </p>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-sm border border-gray-200 rounded-xl p-5"
              >
                <div className="mb-4">
                  <p className="text-xs text-gray-500">Order ID</p>
                  <p className="font-medium text-gray-800 break-words">{order._id}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Scheduled</p>
                    <p className="text-gray-800">
                      {order.scheduledDate} at {order.scheduledTime}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Type</p>
                    <p className="text-gray-800">{order.paymentType}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Payment Status</p>
                    <p className="text-gray-800">{order.paymentStatus}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Amount</p>
                    <p className="text-gray-800">₹{order.amount}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-1">Order Status</p>
                    <p className="text-gray-800">{order.status}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Items</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-800">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.serviceName} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

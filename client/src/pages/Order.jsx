import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const { axios, toast, user } = useAppContext();
  const [filterStatus, setFilterStatus] = useState("All");

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/order/user/${user._id}`
      );
      if (data.success) {
        setOrders(data.orders);
        console.log(data.orders);
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
  // Filter orders based on selected status
  const filteredOrders = orders.filter((order) =>
    filterStatus === "All" ? true : order.status === filterStatus
  );

  return (
    <div className="p-10 flex flex-col mt-25">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">My Orders</h2>
        <select
          className="p-2 border rounded bg-white text-black"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {filteredOrders.length === 0 ? (
        <p>
          No {filterStatus !== "All" ? filterStatus.toLowerCase() : ""} orders.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order._id} className="border flex flex-row p-4 rounded-2xl shadow h-full w-full">
                <div className="flex flex-col">

              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <div className="flex flex-col">
                {order.items.map((item, idx) => (
                    <h1 key={idx} className="text-2xl">
                    {item.serviceName} × {item.quantity}
                  </h1>
                ))}
              </div>
                </div>
              <p>
                <strong>Scheduled:</strong> {order.scheduledDate} at{" "}
                {order.scheduledTime}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentType} (
                {order.paymentStatus})
              </p>
              <p>
                <strong>Amount:</strong> ₹{order.amount}
              </p>
              <p className="">
                <strong>Status:</strong> {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;

import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { CircleX } from "lucide-react";

const Cart = () => {
  const {
    cartItems,
    services,
    categories,
    getCartCount,
    removeFromCart,
    getCartSummary,
    setShowSelectSlot,
    navigate,
    user,
    toast,
    axios,
    serviceDate,
    serviceTime,
    setCartItems,
    BACKEND_URL
  } = useAppContext();

  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [paymentMode, setPaymentMode] = useState("Cash");

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/address/get`);
      if (data.success) {
        setAddress(data.addresses);
        setSelectedAddress(data.addresses[0]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getUserAddress();
  }, [user]);

  if (!cartItems || Object.keys(cartItems).length === 0) {
    return (
      <div className="text-black flex justify-center items-center h-screen text-center text-2xl">
        <h1>Your cart is empty</h1>
      </div>
    );
  }

  const { subtotal, gst, total, discountSaved } = getCartSummary();

  const groupedByCategory = {};
  Object.entries(cartItems).forEach(([serviceId, { quantity }]) => {
    if (quantity > 0) {
      const service = services.find((s) => s.serviceId === serviceId);
      if (service) {
        const catId = service.categoryId;
        if (!groupedByCategory[catId]) groupedByCategory[catId] = [];
        groupedByCategory[catId].push({ ...service, quantity });
      }
    }
  });

  const handleCheckout = async () => {
    if (paymentMode === "Cash") {
      try {
        const items = Object.entries(cartItems).map(([_, val]) => ({
          serviceId: val.serviceId,
          serviceName: val.serviceName,
          quantity: val.quantity,
        }));

        const { data } = await axios.post(
          `${BACKEND_URL}/api/order/cash`,
          {
            userId: user._id,
            items,
            scheduledDate: serviceDate.date,
            scheduledTime: serviceTime,
            address: selectedAddress._id,
          }
        );

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/order");
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Checkout failed. Please try again.");
        console.error(err);
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white overflow-hidden">
      {/* Sidebar Heading */}
      <div className="lg:w-1/4 w-full p-6 flex items-center justify-center bg-white text-black shadow-md rounded-none lg:rounded-br-2xl mt-25 md:mt-0">
        <h1 className="text-2xl sm:text-4xl font-bold text-center lg:text-left">
          Your Tribe Picks
        </h1>
      </div>

      {/* Cart Items */}
      <div className="lg:w-2/4 w-full overflow-y-auto h-full p-4 space-y-6 md:mt-25">
        {Object.entries(groupedByCategory).map(
          ([categoryId, servicesInCat]) => {
            const category = categories.find(
              (c) => c.categoryId === categoryId
            );
            return (
              <div key={categoryId} className="mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-primary">
                  {category?.name || "Other Services"}
                </h2>
                <div className="space-y-4">
                  {servicesInCat.map((service) => (
                    <div
                      key={service.serviceId}
                      className="flex flex-row sm:flex-row items-center justify-between bg-white text-black p-4 rounded-lg shadow"
                    >
                      <div className="flex items-center space-x-4 w-full sm:w-3/4">
                        <img
                          src={category?.image}
                          className="w-16 h-16 object-cover rounded-md"
                          alt={category?.name}
                        />
                        <div className="flex flex-col">
                          <h3 className="text-lg font-semibold">
                            {service.title}
                          </h3>
                          <p className="text-sm">
                            Quantity: {service.quantity}
                          </p>
                          <p className="text-sm">Time: {service.time}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-center mt-2 sm:mt-0">
                        <p className="text-sm font-medium">
                          ₹{service.offerPrice * service.quantity}
                        </p>
                        <button
                          onClick={() => removeFromCart(service.serviceId)}
                          className="mt-2"
                        >
                          <CircleX color="red" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Summary Section */}
      <div className="lg:w-1/4 w-full overflow-y-auto h-full bg-white text-black p-5 shadow-md rounded-none lg:rounded-bl-2xl md:mt-25">
        <h2 className="text-xl sm:text-2xl font-bold border-b pb-2">
          Order Summary
        </h2>

        {/* Address Selector */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Choose Address</h3>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="bg-black text-white p-3 rounded-2xl text-sm"
            >
              Edit
            </button>
          </div>
          <p className="text-gray-600 text-sm">
            {selectedAddress
              ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
              : "No address found"}
          </p>
          {showAddress && (
            <div className="relative top-2 py-1 bg-white border border-gray-300 text-sm w-full rounded-md shadow-sm mt-2">
              {address.map((address, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddress(false);
                  }}
                  className="text-gray-700 p-2 hover:bg-gray-100 cursor-pointer border-b"
                >
                  {address.street}, {address.city}, {address.state},{" "}
                  {address.country}
                </p>
              ))}
              <p
                onClick={() => navigate("/address")}
                className="text-black text-center cursor-pointer p-2 hover:bg-primary/10"
              >
                Add address
              </p>
            </div>
          )}
        </div>

        {/* Slot Selector */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Slot</h3>
            <button
              onClick={() => setShowSelectSlot(true)}
              className="bg-black text-white p-3 rounded-2xl text-sm"
            >
              Edit
            </button>
          </div>
          <div className="text-sm text-gray-800 flex flex-row justify-between items-center">
            {Object.entries(serviceDate).map(([key, value], idx) => (
              <p key={idx}>{value}</p>
            ))}
            <p>{serviceTime}</p>
          </div>
        </div>

        {/* Price Summary */}
        <div className="space-y-2 text-sm border-t border-b py-3">
          <div className="flex justify-between">
            <span>Total Items:</span>
            <span className="font-semibold">{getCartCount()}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>GST:</span>
            <span>₹{gst}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount:</span>
            <span>- ₹{discountSaved}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2">
            <span>Total Amount:</span>
            <span>₹{total}</span>
          </div>
        </div>

        {/* Payment Mode */}
        <div className="flex flex-col gap-2 text-sm mt-4">
          <label htmlFor="payment" className="font-semibold">
            Payment Mode
          </label>
          <select
            name="payment"
            id="payment"
            onChange={(e) => setPaymentMode(e.target.value)}
            className="border border-gray-300 p-2 rounded-md text-sm bg-white"
          >
            <option value="Cash">Cash</option>
            <option value="Online">Online (UPI/Debit/Credit)</option>
          </select>
        </div>

        {/* Checkout Button */}
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-900 mt-4"
        >
          {paymentMode === "Cash" ? "Place Order" : "Proceed To Payment"}
        </button>
      </div>
    </div>
  );
};

export default Cart;

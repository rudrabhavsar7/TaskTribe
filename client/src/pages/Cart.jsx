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
    setCartItems
  } = useAppContext();

  const [address, setAddress] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState([]);
  const [paymentMode, setPaymentMode] = useState("Cash");

  console.log(paymentMode);

  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/address/get");
      console.log(data);
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
      <div className="text-white text-center mt-10">
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
        const items = Object.entries(cartItems).map((item) => ({
        serviceId: item[1].serviceId,
        serviceName: item[1].serviceName,
        quantity:item[1].quantity
      }));

      console.log(items);

      const { data } = await axios.post("http://localhost:4000/api/order/cash", {
        userId: user._id,
        items,
        scheduledDate: serviceDate.date,
        scheduledTime: serviceTime,
        address: selectedAddress._id,
      });

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
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Left Heading */}
      <div className="lg:w-1/4 w-full p-6 flex items-center justify-center bg-white text-black sticky top-0 z-10 shadow-md rounded-none lg:rounded-br-2xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-center lg:text-left">
          Your Tribe Picks
        </h1>
      </div>

      {/* Cart Items */}
      <div className="lg:w-2/4 w-full p-4 space-y-6 overflow-y-auto max-h-[70vh] lg:max-h-full md:mt-25">
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
      <div className="lg:w-1/4 w-full bg-white text-black p-5 shadow-md rounded-none lg:rounded-bl-2xl md:mt-25">
        <h2 className="text-xl sm:text-2xl font-bold mb-4">Order Summary</h2>

        <div className="mb-4 flex flex-row items-center justify-between">
          <h3 className="font-semibold mb-1">Choose Address</h3>
          <p className="text-gray-500">
            {selectedAddress
              ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.state},${selectedAddress.country}`
              : "No address found"}
          </p>
          <button
            onClick={() => setShowAddress(!showAddress)}
            className="bg-black text-white p-3 rounded-2xl text-sm"
          >
            Edit
          </button>
          {showAddress && (
            <div className="relative top-12 py-1 bg-white border border-gray-300 text-sm w-full">
              {address.map((address, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddress(false);
                  }}
                  className="text-gray-500 p-2 hover:bg-gray-100"
                >
                  {address.street}, {address.city}, {address.state},{" "}
                  {address.country}
                </p>
              ))}
              <p
                onClick={() => navigate("/address")}
                className="text-primary text-center cursor-pointer p-2 hover:bg-primary/10"
              >
                Add address
              </p>
            </div>
          )}
        </div>

        <div className="mb-6 flex flex-row items-center justify-between">
          <h3 className="font-semibold mb-1">Slot</h3>
          <button
            onClick={() => setShowSelectSlot(true)}
            className="bg-black text-white p-3 rounded-2xl text-sm"
          >
            Edit
          </button>
          {Object.entries(serviceDate).map(([date], idx) => {
            return <p key={idx}>{serviceDate[date]}</p>;
          })}
          <p>{serviceTime}</p>
        </div>

        <div className="space-y-2 text-sm">
          <p>
            Total Items: <span className="font-semibold">{getCartCount()}</span>
          </p>
          <p>Subtotal: ₹{subtotal}</p>
          <p>GST: ₹{gst}</p>
          <p>Discount: ₹{discountSaved} </p>
          <p className="font-bold">Total Amount: ₹{total}</p>
        </div>
        <select
          name="payment"
          id="payment"
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="Online">Online(UPI/Debit/Credit)</option>
        </select>
        <button onClick={handleCheckout}>
          {paymentMode === "Cash" ? "Place Order" : " Proceed To Payment"}
        </button>
      </div>
    </div>
  );
};

export default Cart;

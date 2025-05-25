import React from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { addToCart, removeFromCart, catServices, cartItems } = useAppContext();

  const findCategory = (id) => {
    return catServices.find((item) => item.subcategoryId === id);
  };

  const category = findCategory(categoryName);

  const groupedServices = catServices.reduce((acc, service) => {
    const title = service.serviceTitle?.trim() || "Others";
    if (!acc[title]) acc[title] = [];
    acc[title].push(service);
    return acc;
  }, {});

  if (!category) {
    return (
      <div className="text-white text-center mt-10">
        <h1>Category not found</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      {/* Left Section */}
      <div className="md:w-1/3 w-full p-6 flex items-center justify-center sticky top-0 md:h-screen z-10 md:mt-0 mt-25 bg-white text-black rounded-br-2xl">
        <h1 className="text-3xl md:text-5xl font-bold capitalize text-center md:text-right">
          {categoryName.toLowerCase().replaceAll("-", " ")}
        </h1>
      </div>

      {/* Right Scrollable Section */}
      <div className="md:w-2/3 w-full overflow-y-auto p-5 space-y-6 md:mt-30">
        {Object.entries(groupedServices).map(([title, group], idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-2 text-white">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.map((service) => {
                const quantity = cartItems?.[service.serviceId]?.quantity || 0;
                return (
                  <div
                    key={service.serviceId}
                    className="flex flex-row justify-between items-start border p-4 rounded-lg text-black bg-white hover:bg-black/70 hover:text-white transition-colors"
                  >
                    {/* Left: Service Details */}
                    <div className="w-3/4 pr-4">
                      <h3 className="text-lg font-bold mb-1">{service.title}</h3>
                      <p className="text-sm mb-1">{service.time}</p>
                      <p className="text-sm text-yellow-400 mb-2">
                        ₹{service.offerPrice}{" "}
                        <span className="line-through text-gray-400">₹{service.price}</span>
                      </p>
                      <ul className="text-sm space-y-1">
                        {service.description.split(";").map((desc, i) => (
                          <li key={i}>• {desc.trim()}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Cart Buttons */}
                    <div className="w-1/4 flex items-center justify-end">
                      {quantity === 0 ? (
                        <button
                          className="bg-black border border-primary w-20 h-[34px] rounded text-primary font-medium hover:bg-white hover:text-black"
                          onClick={() => addToCart(service.serviceId)}
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 w-24 h-[34px] bg-primary/25 rounded">
                          <button
                            onClick={() => removeFromCart(service.serviceId)}
                            className="px-2 text-lg font-bold"
                          >
                            -
                          </button>
                          <span className="text-center w-6">{quantity}</span>
                          <button
                            onClick={() => addToCart(service.serviceId)}
                            className="px-2 text-lg font-bold"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

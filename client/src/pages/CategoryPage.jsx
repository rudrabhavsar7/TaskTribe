import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { addToCart, removeFromCart, services } = useAppContext();

  const findCategory = (id) => {
    return services.find((item) => item.subcategoryId === id);
  };

  const category = findCategory(categoryName);
  const [counts, setCounts] = useState({});

  const handleAdd = (id) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    addToCart(id);
  };

  const handleRemove = (id) => {
    setCounts((prev) => {
      const newCount = (prev[id] || 0) - 1;
      return { ...prev, [id]: newCount > 0 ? newCount : 0 };
    });
    removeFromCart(id);
  };

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
      <div className="md:w-1/3 w-full p-6 flex items-center justify-center sticky top-0 md:h-screen z-10 md:mt-0 mt-20">
        <h1 className="text-3xl md:text-5xl font-bold capitalize text-center md:text-right">
          {categoryName.toLowerCase().replaceAll("-", " ")}
        </h1>
      </div>

      {/* Right Scrollable Section */}
      <div className="md:w-2/3 w-full overflow-y-auto p-5 space-y-6 md:mt-30">
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {services.map((service, idx) => (
      <div
        key={idx}
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

        {/* Right: Add / Remove Buttons */}
        <div className="w-1/4 flex items-center justify-end">
          {(counts[service.serviceId] || 0) === 0 ? (
            <button
              className="bg-black border border-primary w-20 h-[34px] rounded text-primary font-medium hover:bg-white hover:text-black"
              onClick={() => handleAdd(service.serviceId)}
            >
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 w-24 h-[34px] bg-primary/25 rounded">
              <button
                onClick={() => handleRemove(service.serviceId)}
                className="px-2 text-lg font-bold"
              >
                -
              </button>
              <span className="text-center w-6">
                {counts[service.serviceId]}
              </span>
              <button
                onClick={() => handleAdd(service.serviceId)}
                className="px-2 text-lg font-bold"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
</div>


    </div>
  );
};

export default CategoryPage;

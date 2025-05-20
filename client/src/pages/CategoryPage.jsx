import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { findCategory } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const category = findCategory(categoryName);

  const [counts, setCounts] = useState({});

  const { addToCart, removeFromCart } = useAppContext();

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
    <div className="fixed flex flex-col justify-center md:flex-row mt-20 text-white p-4 md:p-6 bg-gradient-to-b from-black via-zinc-900 to-black h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex justify-center md:justify-center items-center md:mb-20 pr-4">
        <h1 className="text-3xl md:text-5xl font-bold capitalize text-left">
          {category.name}
        </h1>
      </div>

      {/* Right Section (Scrollable content) */}
      <div className="w-full md:w-3/4 overflow-y-auto overflow-x-auto p-5 ml-20">
        {category.subcategories.map((subcategory, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              {subcategory.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcategory.services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex flex-row border p-4 rounded-lg text-black bg-white hover:bg-black/70 hover:text-white transition-colors"
                >
                  <div className="w-2/3">
                    <h3 className="text-lg font-bold mb-1">{service.title}</h3>
                    <p className="text-sm mb-1">{service.time}</p>
                    <p className="text-sm text-yellow-400 mb-2">
                      ₹{service.offerPrice}{" "}
                      <span className="line-through text-gray-400">
                        ₹{service.price}
                      </span>
                    </p>
                    <ul className="text-sm space-y-1">
                      {service.description.map((desc, i) => (
                        <li key={i}>
                          <strong>{desc.title}:</strong> {desc.summary}
                        </li>
                      ))}
                    </ul>
                  </div>
                    <div key={idx} className="text-primary flex items-center justify-center">
                      {(counts[service.id] || 0) === 0 ? (
                        <button
                          className="flex items-center justify-center gap-1 bg-black border border-primary md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium hover:bg-white hover:text-black"
                          onClick={() => handleAdd(service.id)}
                        >
                          Add
                        </button>
                      ) : (
                        <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                          <button
                            onClick={() => handleRemove(service.id)}
                            className="cursor-pointer text-md px-2 h-full"
                          >
                            -
                          </button>
                          <span className="w-5 text-center">
                            {counts[service.id]}
                          </span>
                          <button
                            onClick={() => handleAdd(service.id)}
                            className="cursor-pointer text-md px-2 h-full"
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
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

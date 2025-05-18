import React from "react";
import { useParams } from "react-router-dom";
import { findCategory } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const category = findCategory(categoryName);

  const {addToCart,removeFromCart} = useAppContext();

  const [count, setCount] = React.useState(0);

  if (!category) {
    return (
      <div className="text-white text-center mt-10">
        <h1>Category not found</h1>
      </div>
    );
  }

  return (
    <div className="fixed flex flex-col justify-center md:flex-row mt-20 text-white p-4 md:p-6 bg-black h-screen">
      {/* Left Section */}
      <div className="w-full md:w-1/3 flex justify-center md:justify-center items-center md:mb-20 pr-4">
        <h1 className="text-3xl md:text-5xl font-bold capitalize text-left">
          {category.name}
        </h1>
      </div>

      {/* Right Section (Scrollable content) */}
      <div className="w-full md:w-3/4 overflow-y-auto overflow-x-auto">
        {category.subcategories.map((subcategory, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-3">
              {subcategory.name}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcategory.services.map((service, idx) => (
                <div
                  key={idx}
                  className="flex flex-row border p-4 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors"
                >
                  <div className="w-2/3">
                    <h3 className="text-lg font-bold mb-1">{service.title}</h3>
                    <p className="text-sm text-primary mb-1">{service.time}</p>
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
                    <div key={idx} className="text-primary">
                        {count === 0 ? (
                            <button className="flex items-center justify-center gap-1 bg-black border border-primary md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium" onClick={() => setCount(1)} >
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M.583.583h2.333l1.564 7.81a1.17 1.17 0 0 0 1.166.94h5.67a1.17 1.17 0 0 0 1.167-.94l.933-4.893H3.5m2.333 8.75a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0m6.417 0a.583.583 0 1 1-1.167 0 .583.583 0 0 1 1.167 0" stroke="#615fff" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                                <button onClick={() => removeFromCart(service.id)} className="cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{count}</span>
                                <button onClick={() => addToCart(service.id)} className="cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
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

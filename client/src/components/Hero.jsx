import React, { useState, useRef } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openService, setOpenService] = useState([]);

  const {
    navigate,
    categories,
    subcategories,
    services,
    setCatServices,
  } = useAppContext();

  const container = useRef();

  useGSAP(
    () => {
      gsap.from(".heading", {
        x: -100,
        opacity: 0,
        delay: 0.5,
        duration: 0.5,
        stagger: 0.2,
      });

      gsap.from(".right", {
        opacity: 0,
        delay: 0.5,
        duration: 0.5,
        stagger: 0.2,
      });
    },
    { scope: container }
  );

  const openCategory = async (service) => {
    if (!subcategories || !Array.isArray(subcategories)) {
      console.error("Subcategories not loaded or invalid");
      return;
    }

    const matchedSubcategories = subcategories.filter(
      (item) => item.categoryId === service.categoryId
    );

    service.services = matchedSubcategories;

    setOpenService(service);
    setIsOpen(true);
  };

  const handleSubcategoryClick = (subcategory) => {
    // Filter main services by selected subcategory
    const filtered = services.filter(
      (service) => service.subcategoryId === subcategory.subcategoryId
    );

    // Update catServices state in context
    setCatServices(filtered);

    // Navigate to the category page (subcategory name slugified)
    navigate(`/${subcategory.name.toLowerCase().replace(/\s+/g, "-")}`, {
      state: subcategory.name,
    });

    setIsOpen(false);
  };

  const groupedSubcategories = openService.services?.reduce((acc, item) => {
    const title = item.subcategoryTitle || "Others";
    if (!acc[title]) acc[title] = [];
    acc[title].push(item);
    return acc;
  }, {});

  return (
    <div
      ref={container}
      className="flex flex-col md:flex-row items-center justify-center px-4 md:px-16 pt-20 pb-10 gap-10 min-h-screen overflow-hidden"
    >
      {/* Left Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="heading text-5xl sm:text-6xl md:text-6xl lg:text-8xl font-bold text-primary leading-snug text-left md:text-left mb-4 md:mb-0">
          Your Tribe of Trusted Professionals
        </h1>
      </div>

      {/* Right Section */}
      <div className="right w-full md:w-1/2 flex flex-col gap-4 md:gap-0">
        <h2 className="text-2xl md:text-4xl font-bold text-primary ml-2 mb-4 text-center md:text-left">
          What Are You Looking For?
        </h2>

        <div className="bg-primary text-black p-4 md:p-5 rounded-2xl border-4 border-black shadow-white/70 shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-3">
            {categories.map((service, index) => (
              <button
                key={index}
                onClick={() => openCategory(service)}
                className="cursor-pointer flex flex-col p-2 items-center text-sm text-center bg-gray-50/10 rounded-xl hover:shadow-2xl hover:shadow-white hover:bg-black hover:text-primary"
              >
                <img
                  className="h-14 w-14 object-contain mb-1"
                  src={service.image}
                  alt={service.name}
                />
                <span>{service.name}</span>
              </button>
            ))}
          </div>

          {isOpen && openService && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 px-2 sm:px-4">
              <div className="bg-black/90 text-white p-4 sm:p-6 rounded-xl w-full max-w-lg relative shadow-xl overflow-y-auto max-h-[90vh] border">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-3 text-white hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
                <h3 className="text-xl md:text-2xl font-bold mb-4">
                  {openService.title}
                </h3>

                <div className="space-y-6">
                  {groupedSubcategories &&
                    Object.entries(groupedSubcategories).map(
                      ([title, items]) => (
                        <div key={title} className="space-y-2">
                          <h2 className="text-md font-bold text-white">
                            {title}
                          </h2>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {items.map((item, i) => (
                              <button
                                key={i}
                                onClick={() => handleSubcategoryClick(item)}
                                className="cursor-pointer flex flex-col items-center text-center hover:shadow-md hover:shadow-white hover:bg-primary hover:text-black p-2 sm:p-3 rounded-2xl text-xs sm:text-sm"
                              >
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-12 w-12 object-contain mb-1"
                                />
                                <span className="text-sm">{item.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;

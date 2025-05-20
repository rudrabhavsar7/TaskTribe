import React, { useState,useRef } from "react";
import { category } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openService, setOpenService] = useState([]);

  const { navigate } = useAppContext();

  const container = useRef();

  useGSAP(()=>{
    gsap.from('.heading',{
      x:-100,
      opacity:0,
      delay:0.5,
      duration:0.5,
      stagger:0.2
    })

    gsap.from('.right',{
      opacity:0,
      delay:0.5,
      duration:0.5,
      stagger:0.2,
    })
  },{ scope: container });

  const openCategory = (service) => {
    setIsOpen(true);
    setOpenService(service);
  };

  return (
    <div ref={container} className="flex flex-col md:flex-row items-center justify-between px-4 md:px-16 pt-20 pb-10 gap-10 min-h-screen overflow-hidden">
      {/* Left Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h1 className="heading text-5xl text-left md:text-8xl font-bold text-primary leading-snug">
          Your Tribe of Trusted Professionals
        </h1>
      </div>

      {/* Right Section */}
      <div className="right w-full md:w-1/2">
        <h2 className="text-2xl md:text-4xl font-bold text-primary ml-2 mb-4 text-center md:text-left">
          What Are You Looking For?
        </h2>

        <div className="bg-primary text-black p-5 rounded-2xl border-4 border-black shadow-white/70 shadow-xl">
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-3">
            {category.map((service, index) => (
              <button
                key={index}
                onClick={() => openCategory(service)}
                className="cursor-pointer flex flex-col p-2 items-center text-sm text-center bg-gray-50/10 rounded-xl hover:shadow-2xl hover:shadow-white hover:bg-black hover:text-primary"
              >
                <img className="h-14 w-14 object-contain mb-1" src={service.image} alt={service.title} />
                <span>{service.title}</span>
              </button>
            ))}
          </div>

          {isOpen && openService && (
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 px-4 transition ease-in-out duration-1000">
              <div className="bg-black/90 text-white p-6 rounded-xl w-full max-w-lg relative shadow-xl overflow-y-auto max-h-[90vh] border">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-2 right-3 text-white hover:text-gray-300 text-2xl"
                >
                  ×
                </button>
                <h3 className="text-xl md:text-2xl font-bold mb-4">{openService.title}</h3>

                <div className="space-y-6">
                  {openService.services.map((service, index) => (
                    <div key={index}>
                      <h4 className="text-lg font-semibold mb-2">{service.subtitle}</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 ">
                        {service.subservices.map((item, i) => (
                          <button
                            key={i}
                            onClick={() =>
                              navigate(`/${item.name.toLowerCase().replace(/\s+/g, "-")}`, {
                                state: item.name,
                              })
                            }
                            className="cursor-pointer flex flex-col items-center text-center hover:shadow-md hover:shadow-white hover:bg-primary hover:text-black p-3 rounded-2xl"
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
                  ))}
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

import React, { useEffect, useState } from "react";
import { images } from "../assets/assets";

const Benifits = () => {
  const imagearray = [images.women, images.electician, images.clean];

  const lines = [
    {
      line: "100% Customer Satisfaction Guaranteed",
      img: images.bestcustomer,
    },
    { line: "Top-Quality Work with Professional Care", img: images.bestquality },
    { line: "On-Time Service, Every Time", img: images.timeismoney },
    { line: "Trusted Experts, Reliable Results", img: images.certificate },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % imagearray.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-10 flex flex-col bg-primary p-5 md:p-10 selection:bg-black selection:text-white">
      {/* Responsive Flex Layout */}
      <div className="flex flex-col md:flex-row gap-5 md:gap-0">
        
        {/* Image Section */}
        <div className="w-full md:w-1/3 h-60 md:h-100 overflow-hidden relative rounded-2xl">
          <img
            src={imagearray[current]}
            alt={`slide-${current}`}
            className="w-full h-full object-cover transition-opacity duration-2000 ease-in-out"
          />
        </div>

        {/* Text & Bullet Section */}
        <div className="flex flex-col w-full md:w-2/3 mt-5 md:mt-0 md:pl-10">
          <h1 className="text-2xl md:text-4xl font-bold text-center md:text-left">
            Why TaskTribe?
          </h1>
          <h1 className="text-2xl md:text-4xl text-center md:text-left">
            Because You Deserve Services That Work for You.
          </h1>
          
          <ul className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-4 text-center">
            {lines.map((line, idx) => (
              <li
                key={idx}
                className="border-2 rounded-xl p-5 flex flex-row justify-center items-center gap-2 hover:bg-black hover:text-white"
              >
                <img src={line.img} className="h-8 w-8" alt="" />
                {line.line}
              </li>
            ))}
          </ul>

          <h1 className="mt-8 text-xl md:text-3xl text-center md:text-left">
            Simplify Life. Amplify Comfort. Choose TaskTribe.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Benifits;

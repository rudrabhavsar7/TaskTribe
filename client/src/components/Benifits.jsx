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
    <div className="min-h-10 flex flex-col bg-primary p-10">
      <div className="flex flex-row">
        <div className="w-1/3 h-100 overflow-hidden relative rounded-2xl">
          <img
            src={imagearray[current]}
            alt={`slide-${current}`}
            className="w-full h-full object-cover transition-opacity duration-2000 ease-in-out"
          />
        </div>
        <div className="flex flex-col pl-10">
          <h1 className="text-4xl font-bold">Why TaskTribe?</h1>
          <h1 className="text-4xl">
            Because You Deserve Services That Work for You.
          </h1>
          <ul className="grid grid-cols-2 mt-5 gap-5 text-center">
            {lines.map((line, idx) => {
              return (
                <li className="border-2 rounded-xl p-5 flex flex-row justify-center items-center gap-2 hover:bg-black hover:text-white" key={idx}>
                    <img src={line.img} className='h-8 w-8' alt="" />
                    {line.line}
                </li>
              );
            })}
          </ul>
          <h1 className="mt-10 text-3xl">Simplify Life. Amplify Comfort. Choose TaskTribe.</h1>
        </div>
      </div>
    </div>
  );
};

export default Benifits;

import React from "react";
import { useAppContext } from "../context/AppContext";

const ServiceSlot = () => {
  const { setShowSelectSlot, getDates, getTimes, setServiceDate, setServiceTime } = useAppContext();

  const dates = getDates();
  const times = getTimes();


  return (
    <div
      onClick={() => setShowSelectSlot(false)}
      className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50 px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="h-3/4 w-3/4 max-w-4xl bg-black text-white flex flex-col p-5 rounded-xl overflow-hidden"
      >
        <h1 className="text-2xl sm:text-3xl font-bold p-2">Choose a Service Slot</h1>

        <div className="flex flex-col space-y-4 overflow-hidden">
          {/* Date Selector */}
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2 sm:gap-4 overflow-x-auto">
            {dates.dates.map((date, index) => (
              <button
                onClick={()=>setServiceDate({date:date,day:dates.days[index]})}
                key={index}
                className="flex-shrink-0 flex flex-col items-center justify-center border-2 border-white bg-white text-black rounded-lg p-2 cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
              >
                <h1 className="text-sm">{date}</h1>
                <h1 className="text-xs sm:text-sm">{dates.days[index]}</h1>
              </button>
            ))}
          </div>

          {/* Selected Date Info */}
          <div>
            <h1 className="text-lg font-semibold p-2">Selected Date</h1>
          </div>

          {/* Scrollable Time Container */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4 flex-1 overflow-y-auto pr-2">
            {times.map((time, index) => (
              <button
                onClick={()=>setServiceTime(time)}
                key={index}
                className="flex flex-col items-center justify-center border-2 border-white bg-white text-black rounded-lg p-2 cursor-pointer hover:bg-black hover:text-white transition-all duration-300"
              >
                <h1 className="text-sm sm:text-base">{time}</h1>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSlot;

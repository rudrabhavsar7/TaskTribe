import React, { useState, useMemo } from "react";

const ServiceList = ({ services, counts, handleAdd, handleRemove }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minRating, setMinRating] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  // 🧠 Filter and Sort
  const filteredServices = useMemo(() => {
    let filtered = services;

    // 🔍 Search
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 💸 Price filter
    if (maxPrice !== "") {
      filtered = filtered.filter((s) => Number(s.offerPrice) <= Number(maxPrice));
    }

    // ⭐ Rating filter
    if (minRating !== "") {
      filtered = filtered.filter((s) => Number(s.review) >= Number(minRating));
    }

    // ⏳ Time filter (exact match like "30 mins", "60 mins")
    if (timeFilter !== "") {
      filtered = filtered.filter((s) => s.time === timeFilter);
    }

    // ↕️ Sort
    if (sortBy === "priceLow") {
      filtered = [...filtered].sort((a, b) => a.offerPrice - b.offerPrice);
    } else if (sortBy === "priceHigh") {
      filtered = [...filtered].sort((a, b) => b.offerPrice - a.offerPrice);
    } else if (sortBy === "ratingHigh") {
      filtered = [...filtered].sort((a, b) => b.review - a.review);
    }

    return filtered;
  }, [services, searchTerm, maxPrice, minRating, timeFilter, sortBy]);

  return (
    <div className="w-full md:w-3/4 overflow-y-auto overflow-x-auto p-5 ml-20">
      {/* 🔧 Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md shadow"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="px-4 py-2 border rounded-md shadow"
        />
        <input
          type="number"
          placeholder="Min Rating (e.g. 4)"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
          className="px-4 py-2 border rounded-md shadow"
        />
        <input
          type="text"
          placeholder='Time (e.g. "30 mins")'
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="px-4 py-2 border rounded-md shadow"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border rounded-md shadow col-span-1 sm:col-span-2 lg:col-span-1"
        >
          <option value="">Sort By</option>
          <option value="priceLow">Price (Low → High)</option>
          <option value="priceHigh">Price (High → Low)</option>
          <option value="ratingHigh">Rating (High → Low)</option>
        </select>
      </div>

      {/* 🧾 Filtered Services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((service, idx) => (
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
                {service.description.split(";").map((desc, i) => (
                  <li key={i}>• {desc.trim()}</li>
                ))}
              </ul>
            </div>

            <div className="text-primary flex items-center justify-center">
              {(counts[service.serviceId] || 0) === 0 ? (
                <button
                  className="flex items-center justify-center gap-1 bg-black border border-primary md:w-[80px] w-[64px] h-[34px] rounded text-primary font-medium hover:bg-white hover:text-black"
                  onClick={() => handleAdd(service.serviceId)}
                >
                  Add
                </button>
              ) : (
                <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                  <button
                    onClick={() => handleRemove(service.serviceId)}
                    className="cursor-pointer text-md px-2 h-full"
                  >
                    -
                  </button>
                  <span className="w-5 text-center">
                    {counts[service.serviceId]}
                  </span>
                  <button
                    onClick={() => handleAdd(service.serviceId)}
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
  );
};

export default ServiceList;

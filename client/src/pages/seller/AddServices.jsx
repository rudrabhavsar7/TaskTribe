import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddService = () => {
  const { axios, services } = useAppContext();

  const [formData, setFormData] = useState({
    serviceId: "",
    title: "",
    review: "",
    price: "",
    offerPrice: "",
    time: "",
    description: "",
    categoryId: "",
    subcategoryId: "",
  });

  const [filterSubcategoryId, setFilterSubcategoryId] = useState("");

  const fields = [
    { name: "serviceId", placeholder: "Enter Service ID" },
    { name: "serviceTitle", placeholder: "Enter Service Title" },
    { name: "title", placeholder: "Enter Title" },
    { name: "review", placeholder: "Enter Review (Number)" },
    { name: "price", placeholder: "Enter Price (₹)" },
    { name: "offerPrice", placeholder: "Enter Offer Price (₹)" },
    { name: "time", placeholder: "Enter Time (e.g. 30 mins)" },
    { name: "description", placeholder: "Enter Description" },
    { name: "categoryId", placeholder: "Enter Category ID" },
    { name: "subcategoryId", placeholder: "Enter SubCategory ID" },
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/seller/service`, formData);
      toast.success("Service added successfully");
      console.log("Success:", res.data);
    } catch (err) {
      console.error("Error uploading service:", err);
      toast.error("Error uploading service");
    }
  };

  const filteredServices = services?.filter((s) =>
    s.subcategoryId.toLowerCase().includes(filterSubcategoryId.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">
      {/* Form */}
      <div className="md:w-1/2 w-full">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-xl shadow space-y-4"
        >
          <h2 className="text-xl font-semibold text-center">Add New Service</h2>

          {fields.map((field) => (
            <input
              key={field.name}
              type="text"
              name={field.name}
              placeholder={field.placeholder}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-2xl text-sm"
              required
            />
          ))}

          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary/70"
          >
            Submit Service
          </button>
        </form>
      </div>

      {/* Divider */}
      <div className="hidden md:block border-r-2"></div>

      {/* Services List */}
      <div className="md:w-1/2 w-full space-y-3 max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-semibold">All Services</h1>

        {/* Filter */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Filter by SubCategory ID"
            value={filterSubcategoryId}
            onChange={(e) => setFilterSubcategoryId(e.target.value)}
            className="border px-3 py-2 rounded text-sm w-full"
          />
          <button
            onClick={() => setFilterSubcategoryId("")}
            className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 text-sm"
          >
            Clear
          </button>
        </div>

        {/* Results */}
        {filteredServices?.length > 0 ? (
          filteredServices.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col md:flex-row border-2 p-3 rounded-2xl items-start md:items-center justify-between"
            >
              <div className="flex flex-col md:w-2/3 text-sm">
                <h1 className="font-bold">ID: {item.serviceId}</h1>
                <h1>Title: {item.title}</h1>
                <h1>Review: {item.review}</h1>
                <h1>₹{item.offerPrice} / <s className="text-gray-500">₹{item.price}</s></h1>
                <h1>Time: {item.time}</h1>
                <h1>SubCategory ID: {item.subcategoryId}</h1>
                <h1>Category ID: {item.categoryId}</h1>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No services found.</p>
        )}
      </div>
    </div>
  );
};

export default AddService;

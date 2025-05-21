import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddService = () => {
  const { axios } = useAppContext();

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

  const fields = [
    { name: "serviceId", placeholder: "Enter Service ID" },
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
      const res = await axios.post("http://localhost:4000/api/seller/service", formData);
      toast.success("Service added successfully");
      console.log("Success:", res.data);
    } catch (err) {
      console.error("Error uploading service:", err);
      toast.error("Error uploading service");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4"
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
            className="w-full border px-4 py-2 rounded"
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
  );
};

export default AddService;

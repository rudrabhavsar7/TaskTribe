import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const AddCategory = () => {
  const { axios, categories } = useAppContext();
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please upload an image");

    const data = new FormData();
    data.append("categoryId", formData.categoryId);
    data.append("name", formData.name);
    data.append("image", imageFile);

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/seller/category`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log("Success:", res.data);
    } catch (err) {
      console.error("Error uploading:", err);
    }
  };

  return (
    <div className="p-4 md:p-8 flex flex-col lg:flex-row gap-6">
      {/* Form Section */}
      <div className="w-full lg:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-xl shadow space-y-4"
        >
          <h2 className="text-xl font-semibold text-center">Add New Category</h2>

          <input
            type="text"
            name="categoryId"
            placeholder="Enter Category ID"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-2xl"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Enter Category Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-2xl"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-secondary
              hover:file:bg-blue-100"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-24 object-cover rounded"
            />
          )}

          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary/70"
          >
            Submit Category
          </button>
        </form>
      </div>

      {/* Divider (optional on large screens only) */}
      <div className="hidden lg:block border-r-2"></div>

      {/* Categories Display */}
      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        <h1 className="text-2xl font-semibold mb-2">Categories</h1>
        {categories.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col md:flex-row gap-3 border p-4 rounded-xl items-start md:items-center justify-between"
          >
            <div className="flex flex-col">
              <h1 className="font-bold text-sm md:text-base">ID: {item.categoryId}</h1>
              <h1 className="text-sm md:text-base">Name: {item.name}</h1>
            </div>
            <img
              src={item.image}
              className="w-20 h-20 object-cover rounded-md"
              alt={item.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCategory;

import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AddSubCategory = () => {
  const { axios, subcategories } = useAppContext();

  const [formData, setFormData] = useState({
    subcategoryId: "",
    subcategoryTitle: "",
    categoryId: "",
    name: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");

  const [filterCategoryId, setFilterCategoryId] = useState("");

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
    data.append("subcategoryId", formData.subcategoryId);
    data.append("subcategoryTitle", formData.subcategoryTitle);
    data.append("categoryId", formData.categoryId);
    data.append("name", formData.name);
    data.append("image", imageFile);

    try {
      const res = await axios.post(
        "http://localhost:4000/api/seller/subcategory",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("SubCategory added successfully");
      console.log("Success:", res.data);
    } catch (err) {
      console.error("Error uploading:", err);
      toast.error("Error uploading SubCategory");
    }
  };

  // Filtered list
  const filteredSubcategories = subcategories?.filter((sub) =>
    sub.categoryId.toLowerCase().includes(filterCategoryId.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8">
      {/* Form */}
      <div className="md:w-1/2 w-full">
        <form
          onSubmit={handleSubmit}
          className="p-6 bg-white rounded-xl shadow space-y-4"
        >
          <h2 className="text-xl font-semibold text-center">
            Add New SubCategory
          </h2>

          <input
            type="text"
            name="subcategoryId"
            placeholder="Enter SubCategory ID"
            value={formData.subcategoryId}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-2xl text-sm"
            required
          />
          <input
            type="text"
            name="subcategoryTitle"
            placeholder="Enter SubCategory Title"
            value={formData.subcategoryTitle}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-2xl text-sm"
            required
          />
          <input
            type="text"
            name="categoryId"
            placeholder="Enter Category ID"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-2xl text-sm"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Enter Category Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-2xl text-sm"
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
              className="w-auto h-20 object-cover rounded"
            />
          )}

          <button
            type="submit"
            className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary/70"
          >
            Submit SubCategory
          </button>
        </form>
      </div>

      {/* Divider */}
      <div className="hidden md:block border-r-2"></div>

      {/* Subcategory List */}
      <div className="md:w-1/2 w-full space-y-3 max-h-[80vh] overflow-y-auto">
        <h1 className="text-2xl font-semibold">All SubCategories</h1>

        {/* Filter */}
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Filter by Category ID"
            value={filterCategoryId}
            onChange={(e) => setFilterCategoryId(e.target.value)}
            className="border px-3 py-2 rounded text-sm w-full"
          />
          <button
            onClick={() => setFilterCategoryId("")}
            className="bg-gray-200 px-3 py-2 rounded hover:bg-gray-300 text-sm"
          >
            Clear
          </button>
        </div>

        {/* Results */}
        {filteredSubcategories?.length > 0 ? (
          filteredSubcategories.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-colsm:flex-row md:flex-row border-2 p-3 rounded-2xl items-start md:items-center justify-between"
            >
              <div className="flex flex-col md:w-2/3 text-sm">
                <h1 className="font-bold">ID: {item.subcategoryId}</h1>
                <h1>Title: {item.subcategoryTitle}</h1>
                <h1>Name: {item.name}</h1>
                <h1>Category ID: {item.categoryId}</h1>
              </div>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-16 w-16 object-cover rounded mt-2 md:mt-0"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-4">No subcategories found.</p>
        )}
      </div>
    </div>
  );
};

export default AddSubCategory;

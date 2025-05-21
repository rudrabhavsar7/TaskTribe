import React, { useState } from "react";
import { useAppContext } from "../../context/AppContext";

const AddCategory = () => {

  const {axios} = useAppContext();
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
      const res = await axios.post("http://localhost:4000/api/seller/category", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Success:", res.data);
    } catch (err) {
      console.error("Error uploading:", err);
    }
  };


   return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">Add New Category</h2>

      <input
        type="text"
        name="categoryId"
        placeholder="Enter Category ID"
        value={formData.categoryId}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Enter Category Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded"
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
        <img src={preview} alt="Preview" className="w-auto h-20 object-cover rounded" />
      )}

      <button
        type="submit"
        className="w-full bg-secondary text-white py-2 rounded hover:bg-secondary/70"
      >
        Submit Category
      </button>
    </form>
  );
};

export default AddCategory;

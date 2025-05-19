import React,{useState} from "react";

const AddSubCategory = () => {
  const [subcategoryFormData, setSubCategoryFormData] = useState({
    subcategoryId: "",
    name: "",
    image: "",
    categoryId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () =>{
    
  }
  return <div>
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation}>hello</form>
  </div>;
};

export default AddSubCategory;

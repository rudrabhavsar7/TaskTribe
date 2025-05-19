import React,{useState} from "react";

const AddServices = () => {
  const [serviceFormData, setServiceFormData] = useState({
    serviceId: "",
    title: "",
    review: "",
    price: "",
    offerPrice: "",
    time: "",
    description: [
      {
        title: "",
        summary: "",
      },
    ],
    categoryId: "",
    subcategoryId: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = ()=>{
    
  }
  return <div>
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation}></form>
  </div>;
};

export default AddServices;

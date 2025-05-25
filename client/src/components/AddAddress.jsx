import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

// Input field component with fixed styles and proper focus states
const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full p-3 bg-white border-2  border-black rounded text-black
               focus:bg-black focus:text-white focus:ring-primary transition"
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const { axios, toast, user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try{
        const {data} = await axios.post('http://localhost:4000/api/address/add',{
            userId: user._id,
            address
        });

    console.log(data);
    if(data.success){
        toast.success("Address saved successfully!");
        navigate('/cart');
    }else{
        toast.error(data.message);
    }}catch(error){
        toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/cart");
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen w-full justify-center items-center flex-col md:flex-row">
      <div className="w-full md:w-1/3 h-full bg-black p-6 flex items-center justify-center">
        <p className="text-2xl md:text-5xl text-white font-semibold text-left">
          Add Shipping Address
        </p>
      </div>
      <div className="flex flex-col md:flex-row justify-center p-4 w-full md:w-2/3">
        <div className="flex-1 md:w-2/3 w-full">
          <form onSubmit={onSubmitHandler} className="w-full space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="firstName"
                type="text"
                placeholder="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="lastName"
                type="text"
                placeholder="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="email"
              type="email"
              placeholder="Email"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="street"
              type="text"
              placeholder="Street"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="city"
                type="text"
                placeholder="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="state"
                type="text"
                placeholder="State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name="zipcode"
                type="number"
                placeholder="Zip Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name="country"
                type="text"
                placeholder="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name="phone"
              type="text"
              placeholder="Phone"
            />

            <button
              type="submit"
              className="w-full mt-6 bg-black text-white py-3 hover:bg-white hover:text-black border-black border-2 transition cursor-pointer uppercase rounded"
            >
              Save Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;

import React from "react";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";
import Cart from "../pages/Cart";

const Login = () => {

    const {showUserLogin,setShowUserLogin,user,setUser,setState,state,axios,toast,navigate,fetchUser,cartItems} = useAppContext();

    const [formData,setFormData] = useState({
      name:'',
      email:'',
      password:'',
      role:'user',
      cartItems:{}
    });

    const handleChange = (e)=>{
      setFormData({...formData,[e.target.name]:e.target.value});
    }

    const onSubmitHandler = async (e)=>{
      console.log(formData);
      e.preventDefault();
      try {

        const payload = state === "login"
          ? { email: formData.email, password: formData.password, cartItems: cartItems}
          : formData;
        const {data} = await axios.post(`http://localhost:4000/api/user/${state}`,payload)

        if (data.success) {
          setUser(data.user);
          setShowUserLogin(false);
          fetchUser();
          if(state === 'register'){
            toast.success("User Created");
          }else{

            toast.success("Logged In");
          }
        navigate("/");
      } else {
        toast.error(data.message);
      }
      } catch (error) {
        toast.error(error.message);
      }
    }
  return (
    <div onClick={()=>{setShowUserLogin(false)}} className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-50">
      <form onSubmit={onSubmitHandler}
        onClick={(e) => {
          e.stopPropagation();
        }} className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          {state === "login" ? "Login" : "Register"}
        </h2>
        {state==='register' && (<input
          name="name"
          onChange={handleChange}
          className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="text"
          placeholder="Enter your name"
          required
        />)}
        <input
          name="email"
          onChange={handleChange}
          className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="email"
          placeholder="Enter your email"
          required
        />
        <input
          name="password"
          onChange={handleChange}
          className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="password"
          placeholder="Enter your password"
          required
        />
        
        <div className="text-right py-4">
          <span className="text-secondary underline cursor-pointer" >
            Forgot Password
          </span>
        </div>
        {
            state === 'login' ? (
                <>
                <button
                type="submit"
                className="w-full mb-3 bg-secondary hover:bg-secondary/90 active:scale-95 transition py-2.5 rounded-full text-white"
                >
                Login
                </button>
                <p className="text-center mt-4">
                    Don't have a account?{" "}
                <span onClick={()=>setState('register')}className="text-secondary underline cursor-pointer">
                    SignUp
                </span>
                </p>
            </>
            ) : (
                <>
                <button
                type="submit"
                className="w-full mb-3 bg-secondary hover:bg-secondary/90 active:scale-95 transition py-2.5 rounded-full text-white"
                >
                Register
                </button>
                <p className="text-center mt-4">
                    Already have a account?{" "}
                <span onClick={()=>setState('login')}className="text-secondary underline cursor-pointer">
                    Login
                </span>
                </p>
            </>
            )
        }
      </form>
    </div>
  );
};

export default Login;

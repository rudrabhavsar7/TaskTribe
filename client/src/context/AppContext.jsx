import React, { createContext, useContext, useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { addMinutes, format, addDays, set} from 'date-fns';

// Create context
const AppContext = createContext();
axios.defaults.withCredentials = true;
// Provider component
export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [state, setState] = useState("login");
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showSelectSlot, setShowSelectSlot] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [catServices, setCatServices] = useState([]);
  const [serviceDate,setServiceDate] =useState([]);
  const [serviceTime,setServiceTime] =useState([]);
  const navigate = useNavigate();

  //add product to cart
  const addToCart = (serviceId) => {
  if (!user) {
    toast.error("Please Login First");
    setShowUserLogin(true);
    return;
  }
  const service = services.find((s) => s.serviceId === serviceId);
  console.log(service._id)

  setCartItems((prevCart) => {
    const currentItem = prevCart?.[serviceId];
    const updatedCart = currentItem
      ? {
          ...prevCart,
          [serviceId]: {
            ...currentItem,
            quantity: currentItem.quantity + 1,
          },
        }
      : {
          ...prevCart,
          [serviceId]: {
            serviceId : service._id,
            serviceName : service.title,
            quantity: 1,
          },
        };

    updateCartItems(updatedCart);

    return updatedCart;
  });

  toast.success("Added to cart");
};

  //remove product from cart

  const removeFromCart = (serviceId) => {
   if (!user) {
    toast.error("Please Login First");
    setShowUserLogin(true);
    return;
  }

  setCartItems((prevCart) => {
    const currentItem = prevCart?.[serviceId];
    if (!currentItem) return prevCart;

    let updatedCart;

    if (currentItem.quantity === 1) {
      const { [serviceId]: _, ...rest } = prevCart;
      updatedCart = rest;
    } else {
      updatedCart = {
        ...prevCart,
        [serviceId]: {
          ...currentItem,
          quantity: currentItem.quantity - 1,
        },
      };
    }

    updateCartItems(updatedCart);
    return updatedCart;
  });

  toast.success("Removed from cart");
  };

  //get cart items count
  const getCartCount = () => {
    let count = 0;
    for (const items in cartItems) {
      count += cartItems[items].quantity;
    }
    return count;
  };

  //get cart total price
const getCartAmount = () => {
  let totalPrice = 0;

  for (const serviceId in cartItems) {
    const service = services.find((item) => item.serviceId === serviceId);
    const quantity = cartItems[serviceId].quantity;

    if (quantity > 0 && service) {
      totalPrice += service.offerPrice * quantity;
    }
  }

  return Math.floor(totalPrice);
};

const getCartDiscountSaved = () => {
  let discountSaved = 0;

  for (const serviceId in cartItems) {
    const service = services.find((item) => item.serviceId === serviceId);
    const quantity = cartItems[serviceId].quantity;

    if (quantity > 0 && service) {
      const discountPerItem = service.price - service.offerPrice;
      discountSaved += discountPerItem * quantity;
    }
  }

  return Math.floor(discountSaved);
};


const getCartSummary = () => {
  const GST_RATE = 0.18;
  let subtotal = 0;
  let discountSaved = 0;

  for (const serviceId in cartItems) {
    const service = services.find((item) => item.serviceId === serviceId);
    const quantity = cartItems[serviceId].quantity;

    if (quantity > 0 && service) {
      const itemSubtotal = service.offerPrice * quantity;
      const itemDiscount = (service.price - service.offerPrice) * quantity;

      subtotal += itemSubtotal;
      discountSaved += itemDiscount;
    }
  }

  const gst = subtotal * GST_RATE;
  const total = subtotal + gst;

  return {
    subtotal: Math.floor(subtotal),
    gst: Math.floor(gst),
    total: Math.floor(total),
    discountSaved: Math.floor(discountSaved),
  };
};

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/user/is-auth",
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      } else {
        setUser(false);
        setCartItems({});
      }
    } catch (error) {
      setUser(null);
      setCartItems({});
    }
  };

  const fetchSellerStatus = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/seller/is-auth"
      );
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch (error) {
      setIsSeller(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/seller/allcategory"
      );
      if (data.success) {
        setCategories(data.categories);
        console.log(data.categories); // Debug check
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/seller/allsubcategory"
      );
      if (data.success) {
        setSubCategories(data.subcategories);
        console.log(data.subcategories); // Debug check
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchAllService = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/seller/allservice"
      );
      if (data.success) {
        setServices(data.services);
        console.log(data.services); // Debug check
      } else {
        console.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error("Error fetching categories:", error.message);
    }
  };

  const fetchServicesBySubcategoryId = async (subcategoryId) => {
  try {
    const { data } = await axios.get(
      `http://localhost:4000/api/seller/services?subcategoryId=${subcategoryId}`
    );
    if (data.success) {
      setCatServices(data.services);
      console.log(data.services); // Debug check
    } else {
      console.error("Failed to fetch services by subcategory");
    }
  } catch (error) {
    console.error("Error fetching services by subcategory:", error.message);
  }
};

  const updateCartItems = async (updatedCart) => {
    if (!user) {
      console.log("User not logged in, not updating cart items");
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:4000/api/user/cart", {
        userId: user._id,
        cartItems: updatedCart,
      });

      if (data.success) {
        setCartItems(data.cartItems);
        console.log("Cart saved to DB:", data.cartItems);
      } else {
        console.error("Failed to update CartItems:", data.message);
      }
    } catch (error) {
      console.error("Error updating CartItems:", error.message);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchSellerStatus();
    fetchCategories();
    fetchSubCategories();
    fetchAllService();
  }, []);

  const getDates= () =>{
    const today = new Date();
    const dates = [];
    const days = []
    for (let i = 0; i < 7; i++) {
      const date = format(addDays(today, i), "dd-MM-yy");
      const day = format(addDays(today, i), "EEE");
      dates.push(date);
      days.push(day);
    }
    return { dates, days };
  };

  const getTimes = () => {
    const time = new Date(0, 0, 0, 9, 0);
    const times = [];
    for (let i = 0; i < 19; i++) {
      times.push(format(addMinutes(time, i * 30), "hh:mm"));
    }
    return times;
  };
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isSeller,
        setIsSeller,
        navigate,
        showUserLogin,
        setShowUserLogin,
        setState,
        state,
        addToCart,
        removeFromCart,
        axios,
        toast,
        fetchUser,
        fetchSellerStatus,
        categories,
        setCategories,
        fetchCategories,
        fetchSubCategories,
        subcategories,
        services,
        setServices,
        fetchAllService,
        setCartItems,
        cartItems,
        getCartCount,
        getCartAmount,
        getCartDiscountSaved,
        getCartSummary,
        setShowSelectSlot,
        showSelectSlot,
        getDates,
        getTimes,
        serviceDate,
        serviceTime,
        setServiceDate,
        setServiceTime,
        fetchServicesBySubcategoryId,
        setCatServices,
        catServices
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useAppContext = () => useContext(AppContext);

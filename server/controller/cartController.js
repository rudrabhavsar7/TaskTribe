import User from "../model/User.js";

// Update User CartData : /api/user/cart

export const updatecart = async (req, res) => {
  try {
    console.log("Received cart update:", req.body);
    const { userId,cartItems } = req.body;

    if (!userId || !cartItems || typeof cartItems !== "object") {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true } // return updated document
    );
    
    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    console.log(cartItems);
    res.json({ success: true, message: "Cart Updated", cartItems:updatedUser.cartItems });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

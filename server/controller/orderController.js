import Order from "../model/Order.js";
import { Service } from "../model/Category.js";

//Add Order /api/order/cash

export const addOrdercash = async (req, res) => {
  try {
    const { items, userId, scheduledDate, scheduledTime, address } = req.body;

    if (!userId || !address || items.length === 0) {
      return res
        .status(400)
        .json({ success: "Failed", message: "Invalid Data" });
    }

    console.log(req.body);

    let amount = 0;
    for (const item of items) {
      const service = await Service.findById(item.serviceId);
      console.log(service);
      if (!service) {
        return res.json({ success: false, message: "Product not found" });
      }
      amount += service.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.18);

    const order = await Order.create({
      customerId: userId,
      items,
      status: "Pending",
      scheduledDate: scheduledDate,
      scheduledTime: scheduledTime,
      paymentType: "Cash",
      paymentStatus: "Pending",
      address: address,
      amount: amount,
    });

    return res.json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getUserOrder = async (req,res) => {
   try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const orders = await Order.find({ customerId: userId }).sort({ _id: -1 });

    console.log(orders);

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
    
}

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("customerId", "name email")
      .populate("address"); // optional: populate address details

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ success: true, message: "Order status updated", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
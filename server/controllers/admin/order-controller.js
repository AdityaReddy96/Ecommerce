import { Order } from "../../models/Order.js";

export const getOrdersOfAllUsers = async (req, res) => {
  try {
    const orders = await Order.find({});

    if (!orders.length) {
      res.status(404).json({
        success: false,
        message: "No Orders Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order Fetched Successfully",
      data: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured in getOrderDetails",
    });
  }
};

export const getOrderDetailsAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({
        success: false,
        message: "Order Not Found In getOrderDetails",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order Details Fetched Successfully",
      data: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occured in getOrderDetails",
    });
  }
};

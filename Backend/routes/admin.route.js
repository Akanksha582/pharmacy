import express from "express";
import Product from "../models/Product.js";
import User from "../models/User.js";
//import Order from "../models/Order.js";

const router = express.Router();

router.get("/stats", async (req,res)=>{
  try{

    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    const orders = await Order.find();

    const totalSales = orders.length;

    const revenue = orders.reduce(
      (sum,o)=> sum + o.totalAmount, 0
    );

    res.json({
      totalProducts,
      totalUsers,
      totalSales,
      revenue
    });

  }catch(e){
    res.status(500).json({error:e.message});
  }
});

export default router;

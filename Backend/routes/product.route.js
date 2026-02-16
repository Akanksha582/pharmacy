import express from "express";
import Product from "../models/Product.js";
import auth from "../Middleware/auth.js";

const router = express.Router();


/* =========================
   ADD PRODUCT — ADMIN ONLY
========================= */
router.post("/add", auth, async (req, res) => {

  if(req.user.role !== "admin"){
    return res.status(403).json({ msg:"Admin only" });
  }

  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


/* =========================
   GET ALL — PUBLIC
========================= */
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});


/* =========================
   UPDATE — ADMIN ONLY
========================= */
router.put("/:id", auth, async (req,res)=>{

  if(req.user.role !== "admin"){
    return res.status(403).json({ msg:"Admin only" });
  }

  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new:true }
    );
    res.json(updated);
  } catch(err){
    res.status(500).json({error: err.message});
  }
});


/* =========================
   DELETE — ADMIN ONLY
========================= */
router.delete("/:id", auth, async (req,res)=>{

  if(req.user.role !== "admin"){
    return res.status(403).json({ msg:"Admin only" });
  }

  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({msg:"Product deleted"});
  } catch(err){
    res.status(500).json({error: err.message});
  }
});


export default router;

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoute);


// MongoDB connect
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// test route
app.get("/", (req,res)=>{
  res.send("🚀 Pharmacy Backend Running");
});

app.listen(5000, ()=>{
  console.log("Server running on port 5000");
});

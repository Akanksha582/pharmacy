import express from "express";
import User from "../models/User.js";
import auth from "../Middleware/auth.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();


// ✅ User register
router.post("/register-user", async (req,res)=>{
  const { email, password, role } = req.body;

  // admin already exists check
if(role === "admin"){
  const adminExists = await User.findOne({ role: "admin" });
  if(adminExists){
    return res.status(400).json({ msg: "Admin already exists" });
  }
 }


  // duplicate email check
  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ msg: "Email already registered" });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = new User({
    email,
    password: hash,
    role: role || "user"   // ✅ FIX
  });

  await user.save();
  res.json({ msg: "User registered" });
});


// ✅ Login (single model)
router.post("/login", async (req,res)=>{
  const { email, password } = req.body;

  const account = await User.findOne({ email });

  if (!account) {
    return res.status(401).json({ msg: "Account not found" });
  }

  const match = await bcrypt.compare(password, account.password);
  if (!match) {
    return res.status(401).json({ msg: "Wrong password" });
  }

  const token = jwt.sign(
    { id: account._id, role: account.role },
    "SECRETKEY123",
    { expiresIn: "1d" }
  );

  res.json({ token, role: account.role });
});

// ✅ Get profile (login user)
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ✅ Update profile
router.put("/update-profile", auth, async (req,res)=>{
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new:true }
    ).select("-password");

    res.json(updated);
  } catch(err){
    res.status(500).json({msg: err.message});
  }
});

export default router;

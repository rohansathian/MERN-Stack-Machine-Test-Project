// backend/routes/authRoutes.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authMiddleware from "../middleware/authMiddleware.js";
import fs from "fs";
import csv from "csv-parser"; 
import upload from "../middleware/uploadMiddleware.js";
import List from "../models/List.js"; 


const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // 👇 Debug: check if JWT_SECRET is loaded
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,  // 👈 make sure this has value
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    console.error("Login error:", error); // 👈 this will show real issue in console
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});
//  Protected route
router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You have access to protected data!",
    user: req.user,
  });
});

// Only admins can create agents
router.post("/add-agent", authMiddleware, async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if logged-in user is admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    // Check if agent already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new User({
      username,
      email,
      password: hashedPassword,
      role: "user", // all agents are 'user' role
    });

    await newAgent.save();
    res.status(201).json({ message: "Agent added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error adding agent", error: error.message });
  }
});

router.post("/upload-csv", authMiddleware, upload.single("file"), async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }

    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        // Fetch all agents
        const agents = await User.find({ role: "user" });
        if (!agents.length) return res.status(400).json({ message: "No agents found" });

        // Distribute items equally among agents
        const distributed = {};
        agents.forEach((agent) => (distributed[agent._id] = []));
        results.forEach((item, index) => {
          const agentIndex = index % agents.length;
          distributed[agents[agentIndex]._id].push(item);
        });

        // ✅ Save distributed lists to MongoDB
        // Optional: Clear previous lists if needed
        await List.deleteMany({}); 

        for (const agentId in distributed) {
          const newList = new List({
            agent: agentId,
            items: distributed[agentId],
          });
          await newList.save();
        }

        res.json({
          message: "CSV uploaded, distributed, and saved successfully",
          distributed,
        });
      });
  } catch (error) {
    res.status(500).json({ message: "Error uploading CSV", error: error.message });
  }
});

router.get("/my-list", authMiddleware, async (req, res) => {
  try {
    const list = await List.findOne({ agent: req.user.id });
    if (!list) {
      return res.status(404).json({ message: "No list assigned to you yet" });
    }
    res.json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

import express from "express";
import mongoose from "mongoose";
import authMiddleware from "../middleware/authMiddleware.js";
import List from "../models/List.js";

const router = express.Router();

// Fetch list assigned to logged-in agent
router.get("/my-list", authMiddleware, async (req, res) => {
  try {
    console.log("Logged in user ID:", req.user.id);
    const list = await List.findOne({ agent: req.user.id });

    console.log("Found list:", list);
      console.log("List agent ID in DB:", "68a8bd24044d69681657b302"); 

    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    res.json(list);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;

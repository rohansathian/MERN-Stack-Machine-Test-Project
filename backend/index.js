  import connectDB from "./config/db.js";
  import express from "express";
  import dotenv from "dotenv";
  import cors from "cors";
  import authRoutes from "./routes/authRoutes.js"; 
  import listRoutes from "./routes/listRoutes.js";

  dotenv.config();

  const app = express();

  // Middlewares
  app.use(cors());
  app.use(express.json());
  app.use("/api/auth", authRoutes); 
  app.use("/api/lists", listRoutes);

  // Test route
  app.get("/", (req, res) => {
    res.send("Server is running...");
  });

  // Port
  const PORT = process.env.PORT || 5000;

  // ✅ Connect DB first, then start server
  const start = async () => {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  };

  start();

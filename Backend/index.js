import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("REQUEST HIT:", req.method, req.url);
  next();
});

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
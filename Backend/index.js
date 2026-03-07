import express from "express";
import dotenv from "dotenv";
import registerRoutes from "./routes.js";

dotenv.config();

const app = express();

app.use(express.json());

registerRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
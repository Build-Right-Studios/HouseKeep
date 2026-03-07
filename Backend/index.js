import express from "express";
import dotenv from "dotenv";
import registerRoutes from "./routes.js";
import connectMongoDB from "./config/mongodb.js"

dotenv.config();

const app = express();

app.use(express.json());

await connectMongoDB();

registerRoutes(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
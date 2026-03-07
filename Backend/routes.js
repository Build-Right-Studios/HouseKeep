import authRoutes from "./Modules/Auth/auth.routes.js";

export default function registerRoutes(app) {

  app.get("/", (req, res) => {
    res.send("HouseKeep Backend Running");
  });

  app.use("/api/v1/auth", authRoutes);

}
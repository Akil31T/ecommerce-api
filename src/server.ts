import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

mongoose
  .connect(config.db_url as string)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
  });
  

module.exports = app; 

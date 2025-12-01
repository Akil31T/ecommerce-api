import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { ProductRoutes } from "./app/modules/products/product.routes";
import { UserRoutes } from "./app/modules/users/user.routes";
import mongoose from "mongoose";
import { v2 as cloudinary } from 'cloudinary';
import config from "./app/config";


const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

  
// 👇 Start server
app.listen(port, () => {
  console.log(`Server running`);
});

// 👇 Product routes
app.use('/api/products', ProductRoutes);
app.use('/api/users', UserRoutes);

// 👇 Health check
app.get('/', (req, res) => {
  res.send('E-Commerce server is running');
});



export default app;

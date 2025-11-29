import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { ProductRoutes } from "./app/modules/products/product.routes";
import { UserRoutes } from "./app/modules/users/user.routes";
import mongoose from "mongoose";

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.DB_URL!)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

  
  // app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

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



// Serve uploaded images
// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Setup multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'products')); // absolute path to uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

// 👇 Upload API Route
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No file uploaded' });
  }
  const fullUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

  res.json({
    success: true,
    message: "Image uploaded successfully",
    filePath: fullUrl,
  });
});

export default app;

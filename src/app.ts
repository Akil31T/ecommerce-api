import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { ProductRoutes } from "./app/modules/products/product.routes";

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

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

// 👇 Product routes
app.use('/api/products', ProductRoutes);

// 👇 Health check
app.get('/', (req, res) => {
  res.send('E-Commerce server is running');
});

// 👇 Start server
app.listen(port, () => {
  console.log(`Server running`);
});

export default app;

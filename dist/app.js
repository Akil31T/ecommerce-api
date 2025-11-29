"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const product_routes_1 = require("./app/modules/products/product.routes");
const user_routes_1 = require("./app/modules/users/user.routes");
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 5000;
// Middleware
app.use(express_1.default.json());
app.use((0, cors_1.default)());
mongoose_1.default
    .connect(process.env.DB_URL)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ MongoDB connection error:", err));
app.use('/api/uploads', express_1.default.static(path_1.default.join(__dirname, 'uploads')));
// 👇 Start server
app.listen(port, () => {
    console.log(`Server running`);
});
// 👇 Product routes
app.use('/api/products', product_routes_1.ProductRoutes);
app.use('/api/users', user_routes_1.UserRoutes);
// 👇 Health check
app.get('/', (req, res) => {
    res.send('E-Commerce server is running');
});
// Serve uploaded images
// app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// Setup multer for file storage
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join(__dirname, '..', 'products')); // absolute path to uploads
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path_1.default.extname(file.originalname)); // unique filename
    }
});
const upload = (0, multer_1.default)({ storage });
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
exports.default = app;

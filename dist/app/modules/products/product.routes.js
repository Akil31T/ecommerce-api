"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
// import { upload } from "../../middlewares/upload";
const multer_1 = __importDefault(require("multer"));
// import { verfiyToken } from "../../middleware/authMiddleware";
// import { isAdmin } from "../../middleware/adminMiddleware";
const router = express_1.default.Router();
// router.post('/',verfiyToken, isAdmin,  ProductControllers.createProduct)
// router.get("/:productId",ProductControllers.getSingleProduct)
// router.put("/:productId", verfiyToken, isAdmin, ProductControllers.updateProduct)
// router.delete("/:productId", verfiyToken, isAdmin, ProductControllers.deleteProduct)
const upload = (0, multer_1.default)({ dest: "uploads/" });
router.post("/", upload.single("image"), product_controller_1.ProductControllers.createProduct);
router.get('/', product_controller_1.ProductControllers.getAllProducts);
router.get("/:productId", product_controller_1.ProductControllers.getSingleProduct);
router.delete("/:productId", product_controller_1.ProductControllers.deleteProduct);
// router.post("/products", upload.single("image"), ProductControllers.createProduct);
router.put("/:productId", product_controller_1.ProductControllers.updateProduct);
// router.post('/', upload.single('image'), ProductControllers.createProduct);
exports.ProductRoutes = router;

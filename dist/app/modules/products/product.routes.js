"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = __importDefault(require("express"));
const product_controller_1 = require("./product.controller");
// import { verfiyToken } from "../../middleware/authMiddleware";
// import { isAdmin } from "../../middleware/adminMiddleware";
const router = express_1.default.Router();
router.get('/', product_controller_1.ProductControllers.getAllProducts);
// router.post('/',verfiyToken, isAdmin,  ProductControllers.createProduct)
// router.get("/:productId",ProductControllers.getSingleProduct)
// router.put("/:productId", verfiyToken, isAdmin, ProductControllers.updateProduct)
// router.delete("/:productId", verfiyToken, isAdmin, ProductControllers.deleteProduct)
router.post('/', product_controller_1.ProductControllers.createProduct);
exports.ProductRoutes = router;

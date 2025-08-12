import express from "express";
import { ProductControllers } from "./product.controller";
import { upload } from "../../middlewares/upload";
// import { verfiyToken } from "../../middleware/authMiddleware";
// import { isAdmin } from "../../middleware/adminMiddleware";
const router = express.Router();

// router.post('/',verfiyToken, isAdmin,  ProductControllers.createProduct)
// router.get("/:productId",ProductControllers.getSingleProduct)
// router.put("/:productId", verfiyToken, isAdmin, ProductControllers.updateProduct)
// router.delete("/:productId", verfiyToken, isAdmin, ProductControllers.deleteProduct)

router.get('/', ProductControllers.getAllProducts)
router.get("/:productId",ProductControllers.getSingleProduct)
router.delete("/:productId", ProductControllers.deleteProduct)
router.put("/:productId", ProductControllers.updateProduct)
router.post('/', upload.single('image'), ProductControllers.createProduct);


export const ProductRoutes = router;
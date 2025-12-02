import express from "express";
import { ProductControllers } from "./product.controller";
import multer from "multer";

// import { verfiyToken } from "../../middleware/authMiddleware";
// import { isAdmin } from "../../middleware/adminMiddleware";
const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// router.post('/',verfiyToken, isAdmin,  ProductControllers.createProduct)
// router.get("/:productId",ProductControllers.getSingleProduct)
// router.put("/:productId", verfiyToken, isAdmin, ProductControllers.updateProduct)
// router.delete("/:productId", verfiyToken, isAdmin, ProductControllers.deleteProduct)

// const upload = multer({ dest: "uploads/" });

// router.post("/", upload.single("image"), ProductControllers.createProduct);

router.get('/', ProductControllers.getAllProducts)
router.get("/:productId",ProductControllers.getSingleProduct)
router.delete("/:productId", ProductControllers.deleteProduct)
router.put("/:productId",upload.single("image"), ProductControllers.updateProduct)
router.post('/', upload.single('image'), ProductControllers.createProduct);
// router.post("/products", upload.single("image"),ProductControllers.createProduct);



export const ProductRoutes = router;
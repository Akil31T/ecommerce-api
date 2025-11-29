"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
const product_model_1 = require("./product.model");
// const createProduct = async (req: Request, res: Response) => {
//     try {
//         const parsed = productValidationSchema.parse(req.body);
//         const nameToCheck = parsed.name.trim().toLowerCase();
//         const existing = await Product.findOne({
//             name: { $regex: new RegExp(`^${nameToCheck}$`, 'i') }
//         });
//         if (existing) {
//             return res.status(409).json({
//                 success: false,
//                 message: "Product with the same name already exists",
//             });
//         }
//         const imageUrl = req.file
//             ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
//             : req.body.image;
//         const productData: TProduct = {
//             ...parsed,
//             image: imageUrl,
//         };
//         console.log("Product Data:", productData);
//         const result = await ProductServices.createAProductIntoDB(productData);
//         res.status(200).json({
//             success: true,
//             message: "Product created successfully",
//             data: result,
//         });
//     } catch (err: any) {
//         res.status(500).json({
//             success: false,
//             message: err.message || "Something went wrong",
//             error: err,
//         });
//     }
// };
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const imageUrl = req.file
        //   ? `${req.protocol}://${req.get("host")}/api/uploads/${req.file.filename}`
        //   : null;
        const image = req.file ? req.file.filename : null;
        const product = yield product_model_1.Product.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            stock: req.body.stock,
            status: req.body.status,
            image: image,
        });
        res.status(201).json({
            success: true,
            message: "Product created",
            data: product,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const result =  await ProductServices.getProductsFromDB();
    const { searchTerm } = req.query;
    const result = yield product_service_1.ProductServices.getProductsFromDB(searchTerm);
    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: result,
    });
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        yield product_service_1.ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Single Product fetched successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const data = req.body;
        const result = yield product_service_1.ProductServices.updateProductIntoDB(productId, data);
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    deleteProduct,
    getSingleProduct,
    updateProduct,
};

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const product_validataion_1 = __importDefault(require("./product.validataion"));
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zodParser = product_validataion_1.default.parse(req.body);
        const result = yield product_service_1.ProductServices.createAProductIntoDB(zodParser);
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: result
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
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
        data: result
    });
});
exports.ProductControllers = {
    createProduct,
    getAllProducts
};

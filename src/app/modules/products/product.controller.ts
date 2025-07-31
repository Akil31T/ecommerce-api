
import { Request, Response } from "express"
import productValidationSchema from "./product.validataion";
import { ProductServices } from "./product.service";
import { TProduct } from "./product.interface";


const createProduct = async (req: Request, res: Response) => {
    try {
        const parsed = productValidationSchema.parse(req.body);

        const imageUrl = req.file
            ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
            : req.body.image;

        const productData: TProduct = {
            ...parsed,
            image: imageUrl,
        };

        const result = await ProductServices.createAProductIntoDB(productData);

        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err,
        });
    }
};

const getAllProducts = async (req: Request, res: Response) => {

    // const result =  await ProductServices.getProductsFromDB();
    const { searchTerm } = req.query;
    const result = await ProductServices.getProductsFromDB(searchTerm as string);
    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: result
    })
}

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        await ProductServices.deleteProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: null
        })


    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || "Something went wrong",
            error: err
        })
    }
}
export const ProductControllers = {
    createProduct,
    getAllProducts,
    deleteProduct
}
import { Request, Response } from "express";
// import { v2 as } from "cloudinary";
import { ProductServices } from "./product.service";
import { Product } from "./product.model";
import cloudinary from "../../middlewares/cloudinary";
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

const createProduct = async (req: Request, res: Response) => {
  try {
    let imageUrl = null;

    if (req.file) {
      const uploadResult = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        stream.end(req.file!.buffer);
      });

      imageUrl = (uploadResult && (uploadResult as any).secure_url) || null;
    }

    const product = await Product.create({
      ...req.body,
      image: imageUrl,
    });

    res.json({ success: true, data: product });

  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};


const getAllProducts = async (req: Request, res: Response) => {
  // const result =  await ProductServices.getProductsFromDB();
  const { searchTerm } = req.query;
  const result = await ProductServices.getProductsFromDB(searchTerm as string);
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: result,
  });
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    await ProductServices.deleteProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: null,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: "Single Product fetched successfully",
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

const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const result = await ProductServices.updateProductIntoDB(productId, data);
    res.status(200).json({
      success: true,
      message: "Product updated successfully",
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
export const ProductControllers = {
  createProduct,
  getAllProducts,
  deleteProduct,
  getSingleProduct,
  updateProduct,
};

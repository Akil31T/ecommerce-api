import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import { Product } from "./product.model";
import cloudinary from "../../middlewares/cloudinary";

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

    let imageUrl = null;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    // Upload image if new file provided
    if (req.file) {
      const file = req.file;
      const uploadResult = await new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "products" },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
        stream.end(file.buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    // Build update data
    const updateData: any = {
      ...req.body,
    };

    // Only set image if new file uploaded
    if (imageUrl) {
      updateData.image = imageUrl;
    }

    // Update product
    const result = await Product.findByIdAndUpdate(
      productId,
      updateData,
      { new: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

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

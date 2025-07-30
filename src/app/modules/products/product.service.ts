import { TProduct } from "./product.interface"
import { Product } from "./product.model"


const createAProductIntoDB =async(productDta:TProduct)=>{
    const result= await Product.create(productDta);
    return result;
}

const getProductsFromDB = async (searchTerm = "") => {
    const query = searchTerm ? {name: {$regex: searchTerm, $options: "i"}} : {}
    const data = await Product.find(query);
    return data;
};

const getSingleProductFromDB = async (id: string) => {
    const result = await Product.findById(id);
    return result;
}


export const ProductServices={
    createAProductIntoDB,
    getProductsFromDB,
    getSingleProductFromDB
}
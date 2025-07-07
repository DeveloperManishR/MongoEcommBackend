import { successResponseWithData } from "../../helpers/apiResponse.js";
import Product from "../../models/product.model.js";
import { dummyProducts } from "../../utils/utils.js";

export const createProduct = () => {
  try {
  } catch (error) {}
};

export const updateProduct = () => {};

export const deleteProduct = () => {};

export const getProductDetails = () => {};

export const getAllProducts = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;

  const query = {};

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: -1 },
  };
  try {
    const products = await Product.paginate(query, options);

    return successResponseWithData(
      res,
      "Products fetched successfully",
      products
    );
  } catch (error) {}
};

export const addMutipleprofucts = async (req, res) => {
  try {
    const filteredProducts = dummyProducts.map((product) => ({
      title: product.title,
      description: product.description,
      category: product.category,
      price: product.price,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      warrantyInformation: product.warrantyInformation,
      shippingInformation: product.shippingInformation,
      availabilityStatus: product.availabilityStatus,
      returnPolicy: product.returnPolicy,
      minimumOrderQuantity: product.minimumOrderQuantity,
      images: product.images,
      thumbnail: product.thumbnail,
    }));
    console.log("filteredProductsfilteredProducts", filteredProducts.length);
    const savedProducts = await Product.insertMany(filteredProducts);
    res.status(201).json(savedProducts);
  } catch (err) {
    res.status(500).json({ message: "Failed to save products", error: err });
  }
};

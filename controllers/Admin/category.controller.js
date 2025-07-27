import {
  ErrorResponse,
  successResponseWithData,
} from "../../helpers/apiResponse.js";
import Category from "../../models/category.model.js";
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return successResponseWithData(res, "Category fetched", categories);
  } catch (error) {
    return ErrorResponse(res, error.message);
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const createCategory = await new Category({
      name,
    }).save();

    return successResponseWithData(res, "Category created", createCategory);
  } catch (error) {
    return ErrorResponse(res, error.message);
  }
};

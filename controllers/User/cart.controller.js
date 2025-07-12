import Cart from "../../models/cart.model.js";
import {
  ErrorResponse,
  successResponseWithData,
} from "../../helpers/apiResponse.js";
export const getCartProducts = async (req, res) => {
  try {
    console.log(req.user);

    const userId = req.user._id;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (req, res) => {
  const { id } = req.params;

  const userId = req.user._id;

  const { quantity } = req.body;
  try {
    const checkProductIncart = await Cart.findOne({ userId, product: id });

    if (checkProductIncart) {
      return ErrorResponse(res, "Product already in cart");
    }

    const addCart = await new Cart({
      userId: userId,
      product: id,
      quantity,
    }).save();

    return successResponseWithData(res, "Product added to cart", addCart);
  } catch (error) {
    console.log("err", error);
  }
};

export const increaseQuantity = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const decreaseQuantity = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartProduct = async () => {
  try {
  } catch (error) {
    console.log(error);
  }
};

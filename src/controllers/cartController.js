import * as cartService from "../services/cartService.js";

export const getAllCartProductsController = async (req, res) => {
  try {
    const product = await cartService.getAllCartProducts();
    res.status(201).json({
      messsage: "All product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const addProductToCartController = async (req, res) => {
  try {
    const product = await cartService.addProductToCart(req);
    res.status(201).json({
      messsage: "Product added successfully",
      data: product,
    });
  } catch (error) {
    console.log(error, "======> Cart");
    res.status(500).json({ error: "Failed to product in cart" });
  }
};

export const removeProductFromCartController = async (req, res) => {
  try {
    const product = await cartService.removeProductFromCart(req);
    res.status(201).json({
      messsage: "Product removed successfuly",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product" });
  }
};

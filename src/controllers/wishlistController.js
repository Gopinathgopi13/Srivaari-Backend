import * as wishlistService from "../services/wishlistService.js";

export const getAllWishlistProductsController = async (req, res) => {
  try {
    const product = await wishlistService.getAllWishlistProducts();
    res.status(201).json({
      messsage: "All product fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const addProductToWishlistController = async (req, res) => {
  try {
    const product = await wishlistService.addProductToWishlist(req);
    res.status(201).json({
      messsage: "Product added successfully",
      data: product,
    });
  } catch (error) {
    console.log(error, "======> Cart");
    res.status(500).json({ error: "Failed to product in wishlist" });
  }
};

export const removeProductFromWishlistController = async (req, res) => {
  try {
    const product = await wishlistService.removeProductFromCart(req);
    res.status(201).json({
      messsage: "Product removed successfuly",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to remove product" });
  }
};

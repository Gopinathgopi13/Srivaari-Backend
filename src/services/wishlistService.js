import { prisma } from "../utils/prisma.js";

export const getAllWishlistProducts = async () => {
  try {
    const products = await prisma.wishlist.findMany({
      include: {
        product: true,
      },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const addProductToWishlist = async (data) => {
  try {
    const wishlistProduct = await prisma.wishlist.create({
      data: data.body,
    });

    return wishlistProduct;
  } catch (error) {
    console.error("Failed to add products in wishlist:", error);
    throw new Error("Failed to add products in wishlist");
  }
};

export const removeProductFromCart = async (data) => {
  let { wishlist_id } = data.query;
  try {
    console.log(data.query, "dataaaaaa");

    let wishlistData = await prisma.wishlist.delete({
      where: {
        wishlist_id: wishlist_id,
      },
    });
    return wishlistData;
  } catch (error) {
    console.error("Error while removing products:", error);
    throw new Error("Failed to remove products");
    u;
  }
};

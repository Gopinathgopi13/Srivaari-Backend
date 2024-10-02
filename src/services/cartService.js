import { prisma } from "../utils/prisma.js";

export const getAllCartProducts = async () => {
  try {
    const products = await prisma.cart.findMany({
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

export const addProductToCart = async (data) => {
  try {
    const cartProduct = await prisma.cart.create({
      data: data.body,
    });

    return cartProduct;
  } catch (error) {
    console.error("Failed to add products in cart:", error);
    throw new Error("Failed to add products in cart");
  }
};

export const removeProductFromCart = async (data) => {
  let { cart_id } = data.query;
  try {
    console.log(data.query, "dataaaaaa");

    let cartData = await prisma.cart.delete({
      where: {
        cart_id: cart_id,
      },
    });
    return cartData;
  } catch (error) {
    console.error("Error while removing products:", error);
    throw new Error("Failed to remove products");
    u;
  }
};

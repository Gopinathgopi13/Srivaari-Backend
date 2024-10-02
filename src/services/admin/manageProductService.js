import { prisma } from "../../utils/prisma.js";

export const addProduct = async (productData) => {
  console.log(productData, "=====> Product Data");
  try {
    return await prisma.product.createMany({
      data: productData,
    });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteProduct = async (productId) => {
  return await prisma.product.delete({
    where: { product_id: productId },
  });
};

export const updateProduct = async (productId, productData) => {
  return await prisma.product.update({
    where: { product_id: productId },
    data: productData,
  });
};

export const addCategory = async (productData) => {
  try {
    const result = await prisma.productCategory.createMany({
      data: productData,
    });
    return result;
  } catch (error) {
    console.error("Error creating categories:", error);
    throw new Error("Failed to create categories");
  }
};

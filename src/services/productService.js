import { prisma } from "../utils/prisma.js";

export const getAllCategories = async () => {
  try {
    const result = await prisma.productCategory.findMany();
    return result;
  } catch (error) {
    console.error("Failed to fetch the categories: ", error);
    throw new Error("Failed to fetch the categories");
  }
};

export const getAllProducts = async (searchParams) => {
  const { searchTerm, categoryId, minPrice, maxPrice } = searchParams;
  const filters = {};
  if (searchTerm && searchTerm.trim()) {
    filters.product_name = {
      contains: searchTerm,
      mode: "insensitive",
    };
  }

  if (categoryId) {
    filters.category_id = categoryId;
  }

  if (minPrice !== undefined) {
    filters.price = {
      gte: minPrice,
      ...(maxPrice !== undefined && { lte: maxPrice }),
    };
  } else if (maxPrice !== undefined) {
    filters.price = {
      lte: maxPrice,
    };
  }

  try {
    const products = await prisma.product.findMany({
      where: filters,
      orderBy: { created_at: "desc" },
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const getSingleProduct = async (product_id) => {
  try {
    const product = await prisma.product.findUnique({
      where: { product_id: product_id },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error(error);
  }
};

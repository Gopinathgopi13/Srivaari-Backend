import * as ProductService from "../services/productService.js";

export const getAllProductsController = async (req, res) => {
  try {
    const { searchTerm, categoryId, minPrice, maxPrice } = req.body;
    const searchParams = {
      searchTerm: searchTerm || "",
      categoryId: categoryId || "",
      minPrice: parseFloat(minPrice) || undefined,
      maxPrice: parseFloat(maxPrice) || undefined,
    };
    const products = await ProductService.getAllProducts(searchParams);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

export const getSingleProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await ProductService.getSingleProduct(id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

export const getAllCategoriesController = async (req, res) => {
  try {
    const product = await ProductService.getAllCategories();
    res.status(201).json({
      messsage: "Categories fetched successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

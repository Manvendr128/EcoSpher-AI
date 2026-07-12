import Category from "../models/Category.js";

const createCategory = async (req, res) => {
  try {
    const { name, type, status } = req.body;

    const existingCategory = await Category.findOne({ name: name.trim() });
    if (existingCategory) {
      return res.status(409).json({
        success: false,
        message: "Category name already exists",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      type,
      status: status || "Active",
    });

    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    console.error("createCategory() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while creating category",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();

    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.error("getCategories() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }
    console.error("getCategoryById() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching category",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, status } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    if (name && name.trim() !== category.name) {
      const existingCategory = await Category.findOne({ name: name.trim() });
      if (existingCategory) {
        return res.status(409).json({
          success: false,
          message: "Category name already exists",
        });
      }
      category.name = name.trim();
    }

    if (type !== undefined) category.type = type;
    if (status !== undefined) category.status = status;

    const updatedCategory = await category.save();

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }
    console.error("updateCategory() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while updating category",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }
    console.error("deleteCategory() error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting category",
    });
  }
};

export {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};

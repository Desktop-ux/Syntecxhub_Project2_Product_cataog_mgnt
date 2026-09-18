const validateProduct = (req, res, next) => {
  const { name, description, price, category, stock, brand } = req.body;

  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Name must contain at least 2 characters");
  }

  if (
    !description ||
    typeof description !== "string" ||
    description.trim().length < 5
  ) {
    errors.push("Description must contain at least 5 characters");
  }

  if (price === undefined || typeof price !== "number" || price < 0) {
    errors.push("Price must be a number greater than or equal to 0");
  }

  if (!category || typeof category !== "string") {
    errors.push("Category is required");
  }

  if (stock === undefined || !Number.isInteger(stock) || stock < 0) {
    errors.push("Stock must be a whole number greater than or equal to 0");
  }

  if (!brand || typeof brand !== "string") {
    errors.push("Brand is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid product data",
      errors,
    });
  }

  next();
};

module.exports = validateProduct;
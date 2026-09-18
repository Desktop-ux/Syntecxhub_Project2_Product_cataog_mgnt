const express = require("express");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getCategorySummary,
} = require("../controllers/productController");
const protect = require("../middleware/authMiddleware");
const validateProduct = require("../middleware/productValidation");

const router = express.Router();

router.post("/", protect, validateProduct, createProduct);
router.get("/", getProducts);
router.get("/summary/category", protect, getCategorySummary);
router.get("/:id", getProductById);
router.put("/:id", protect, validateProduct, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
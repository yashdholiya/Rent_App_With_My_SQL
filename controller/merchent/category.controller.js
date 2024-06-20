const categoryServices = require("../../services/merchent/category.service");
const categoryService = new categoryServices();

// ADD CATEGORY
exports.addCategoriy = async (req, res) => {
  const adminId = req.adminId;
  const { name } = req.body;

  try {
    const result = await categoryService.addToCategoriy(adminId, name);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// GET  SPECIFIC CATEGORY
exports.getCatogery = async (req, res) => {
  try {
    const result = await categoryService.getCategory();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE CATEGORY
exports.deleteCatoger = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await categoryService.deleteCategor(id);
    res.status(200).json(result);
  } catch {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SPECIFIC CATEGORY
exports.getSpecificCAtogery = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await categoryService.getSpecificCategory(id);
    res.json(result);
  } catch {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
// UPDATE CATEGORY
exports.updateCategory = async (req, res) => {
  const id = req.params.id;
  const { ref_merchant_id, name } = req.body;
  try {
    const result = await categoryService.updatecategory(
      id,
      ref_merchant_id,
      name
    );
    if (result) {
      res.json({ message: "category updated successfully" });
    } else {
      res.status(404).send("category not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

// GET ALL CATEGORY WITH PRODUCT
exports.getAllCatogeryWithMerchantToken = async (req, res) => {
  const adminId = req.adminId;
  try {
    const result = await categoryService.getAllCatogeryWithMerchantToken(
      adminId
    );
    if (result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found for this admin",
      });
    }
    res.json(result);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
};

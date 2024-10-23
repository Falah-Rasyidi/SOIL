// Controller for product
const db = require("../database");

exports.all = async (req, res) => {
  try {
    const products = await db.product.findAll();
    res.json(products);
  } catch (error) {
    console.log("Error getting all products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.create = async (req, res) => {
  const tagArray = [];
  for (const tag of req.body.tags) {
    tagArray.push(tag);
  }

  const product = await db.product.create({
    product_name: req.body.name,
    img_src: req.body.img_src,
    category: req.body.category,
    description: req.body.description,
    price: req.body.price,
    discount: req.body.discount,
    stock: req.body.stock,
    // TODO: add tags attribute here
    tags: { tags: tagArray },
  });
  console.log(product);
};

exports.edit = async (req, res) => {
  try {
    const product_id = req.params.product_id;
    const product = db.product.findByPk(product_id);

    product.description = req.body.description;
    product.price = req.body.price;
    await product.save();

    res.json(product);
  } catch (error) {
    console.log("Error editing product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Probably don't need as products won't be deleted
exports.delete = async (req, res) => {
  try {
    const product_id = req.params.product_id;

    // Find the product by ID and delete it
    const product = await db.product.findByPk(product_id);

    await product.destroy();

    // Respond with a success message
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    // Handle any errors
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.search = async (req, res) => {
  try {
    const product = await db.product.findOne({
      where: { name: req.body.product_name },
    });
    res.json({ message: "Able to locate product" });
  } catch (error) {
    console.error("Error locating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

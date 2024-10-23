// Controller for discount
const db = require("../database");

exports.create = async (req, res) => {
  try {
    const discount = await db.discount.create({
      product_id: req.body.product_id,
      percentage: req.body.percentage,
    });
    res.json(discount);
  } catch (error) {
    console.error("Error creating discount: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

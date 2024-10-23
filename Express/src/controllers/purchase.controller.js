// Controller for purchase
const db = require("../database");

exports.create = async (req, res) => {
  const purchase = await db.purchase.create({
    purchase_id: req.body.purchase_id,
    user_id: req.body.user_id,
    cart_id: req.body.cart_id,
  });

  res.json(purchase);
};

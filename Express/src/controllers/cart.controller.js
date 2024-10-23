// Controller for cart
const db = require("../database");

exports.all = async (req, res) => {
  const carts = await db.cart.findAll();

  res.json(carts);
};

// If user hasn't added product yet, create another row for it
// If product already exists under user_id, increment quantity by 1 or however much quantity was.
exports.add = async (req, res) => {
  try {
    const { product, user_id } = req.body;
    const cart = await db.cart.findOne({
      where: { user_id: user_id, product_id: product.product_id },
    });

    const databaseProduct = await db.product.findOne({
      where: { product_id: product.product_id },
    });

    if (cart === null) {
      const newCart = await db.cart.create({
        user_id: user_id,
        product_id: databaseProduct.product_id,
        product_name: databaseProduct.product_name,
        price: databaseProduct.price,
        quantity: product.quantity,
        discount: databaseProduct.discount,
      });

      res.json(newCart);
    } else {
      cart.quantity += product.quantity;
      await cart.save();

      res.json(cart);
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Use if user wants to delete products from their cart
exports.delete = async (req, res) => {
  const { product_id, user_id } = req.query;
  console.log("PRODUCT_ID IS: " + product_id);
  console.log("USER_ID IS: " + user_id);
  try {
    const cart = await db.cart.findOne({
      where: { user_id: user_id, product_id: product_id },
    });

    cart.destroy();
  } catch (error) {
    console.error("Error deleting from cart: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Use to delete products (if any) from the cart if user deletes their account
exports.obliterate = async (req, res) => {
  try {
    const cart = await db.cart.findAll({
      where: { user_id: req.body.user_id },
    });

    cart.destroy();
    res.json("User's products successfully obliterated!");
  } catch (error) {
    console.error("Error obliterating user's products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.get = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    console.log("REQ BODY IS : " + JSON.stringify(user_id));
    const cart = await db.cart.findAll({
      where: { user_id: user_id },
    });

    res.json(cart);
  } catch (error) {
    console.log("Error retrieving user's products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

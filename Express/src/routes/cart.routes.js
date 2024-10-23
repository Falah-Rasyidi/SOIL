// Routes for cart
module.exports = (express, app) => {
  const controller = require("../controllers/cart.controller.js");
  const router = express.Router();

  // Adds a product to the cart
  router.post("/", controller.add);

  // Deletes a product from the cart
  router.delete("/delete", controller.delete);

  // Delete all of user's products (if any) from the cart if user deletes their account
  router.delete("/:id", controller.obliterate);

  // Retrieve a user's products
  router.get("/:id", controller.get);

  // Add account route
  app.use("/api/cart", router);
};

// Routes for product
module.exports = (express, app) => {
  const controller = require("../controllers/product.controller.js");
  const router = express.Router();

  // Controller functions

  // gets all products
  router.get("/", controller.all);

  // creates a product
  router.post("/create", controller.create);

  // Add account route
  app.use("/api/product", router);
};

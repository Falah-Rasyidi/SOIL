// Routes for account
module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Controller functions
  // selects all users
  // router.get("/", controller.all);
  router.get("/login", controller.login);

  // creates a user
  router.post("/", controller.create);

  // searches for a user
  router.get("/select", controller.search);

  // edits a user
  router.put("/edit", controller.edit);

  // deletes a user
  router.delete("/:user_id", controller.delete);

  // Add account route
  app.use("/api/user", router);
};

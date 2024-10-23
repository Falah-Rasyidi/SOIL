// Imports
const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// CORS suport.
app.use(cors());

// Simple Hello World route.
// req = request, res = response
app.get("/", (req, res) => {
  res.json({ message: "This is the server host for the back-end of SOIL." });
});

// Add routes.
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/cart.routes.js")(express, app);
// require("./src/routes/discount.routes.js")(express, app);
require("./src/routes/product.routes.js")(express, app);
// require("./src/routes/purchase.routes.js")(express, app);
// require("./src/routes/review.routes.js")(express, app);

// Set port, listen for requests.
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
  console.log("\n");
});

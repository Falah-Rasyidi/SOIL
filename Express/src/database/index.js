const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.cart = require("./models/cart.js")(db.sequelize, DataTypes);
// db.discount = require("./models/discount.js")(db.sequelize, DataTypes);
db.product = require("./models/product.js")(db.sequelize, DataTypes);
db.purchase = require("./models/purchase.js")(db.sequelize, DataTypes);
db.review = require("./models/review.js")(db.sequelize, DataTypes);

// TODO: Put relations HERE
// db.post.belongsTo(db.user, {
//   foreignKey: { name: "username", allowNull: false },
// });
db.user.hasOne(db.cart);
db.user.hasMany(db.review);
db.review.belongsTo(db.user);

db.product.hasMany(db.review);
db.product.belongsTo(db.cart);
db.review.belongsTo(db.product);

db.cart.hasMany(db.product);
db.cart.hasMany(db.user); // This is because all users share the same cart
db.cart.hasMany(db.purchase); // Multiple, simulataneous purchases can be made

db.purchase.belongsTo(db.cart); // Only the one cart exists

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// sync database
db.sync = async () => {
  // sync database models (tables) in ExpressJS server with the tables on the MySQL server
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });

  // seed data if necessary
  await seedData();
};

async function seedData() {
  seedUsers();
  seedProducts();
}

// seed helper functions
async function seedProducts() {
  const count = await db.product.count();
  if (count > 0) return;
  const products = [
    {
      img_src: "/images/unsplash_oranges.jpg",
      product_name: "Oranges",
      price: 19.99,
      category: "Fruit",
      tags: ["Juicy", "Sweet", "Perfect for Summer!"],
      stock: true,
      discount: 10,
      description:
        " Oranges are bursting with refreshing citrus flavor and are packed with immune-boosting vitamin C. Their juicy sweetness makes them a delightful snack, perfect for any time of day.",
    },
    {
      img_src: "/images/unsplash_apple.jpg",
      product_name: "Apples",
      price: 19.99,
      category: "Fruit",
      tags: ["Fresh, crispy, golden apples", "Refreshing snack"],
      stock: false,
      discount: 0,
      description:
        "Crisp and juicy, apples are a timeless favorite among fruits. With their versatility in both sweet and savory dishes, along with their abundance of fiber and antioxidants, apples are not only delicious but also contribute to overall health and well-being.",
    },
    {
      img_src: "/images/unsplash_broccoli.jpg",
      product_name: "Broccoli",
      price: 15.99,
      category: "Vegetable",
      tags: [
        "Fresh from local Australian farms",
        "Great addition for stir-fry!",
        "100% parabens free or something",
      ],
      stock: true,
      discount: 20,
      description:
        "Broccoli is a nutritional powerhouse, known for its high content of vitamins, minerals, and antioxidants. Its crunchy texture and earthy flavor make it a versatile addition to salads, stir-fries, and soups, providing a boost of essential nutrients with every bite.",
    },
    {
      img_src: "/images/unsplash_carrot.jpg",
      product_name: "Carrots",
      price: 12.99,
      category: "Vegetable",
      tags: ["Vegan", "No added preservatives"],
      stock: false,
      discount: 15,
      description:
        "Vibrant and crunchy, carrots are not only delicious but also incredibly nutritious. Packed with beta-carotene, fiber, and vitamins, carrots promote eye health, aid in digestion, and add a sweet, earthy flavor to a variety of dishes.",
    },
    {
      img_src: "/images/unsplash_cucumber.jpg",
      product_name: "Cucumbers",
      price: 14.99,
      category: "Fruit",
      tags: [
        "Fresh from local Australian farms",
        "Good for salads!",
        "Refreshing",
      ],
      stock: true,
      discount: 30,
      description:
        "Cool and refreshing, cucumbers are a hydrating addition to salads, sandwiches, and dips. With their high water content and crisp texture, cucumbers provide a refreshing crunch while also offering a range of vitamins and minerals for overall health.",
    },
    {
      img_src: "/images/unsplash_lettuce.jpg",
      product_name: "Lettuce",
      price: 11.99,
      category: "Vegetable",
      tags: [
        "Great addition for stir-fry!",
        "Green addition to salads",
        "Fresh from local Australian farms",
      ],
      stock: true,
      discount: 0,
      description:
        "Lettuce is a staple in salads, wraps, and sandwiches, known for its crisp texture and mild flavor. Rich in vitamins and minerals, lettuce is not only refreshing but also contributes to hydration and overall well-being.",
    },
    {
      img_src: "/images/unsplash_capsicums.jpg",
      product_name: "Capsicums",
      category: "Fruit",
      price: 19.99,
      tags: [
        "Perfect for stir-fry!",
        "Firm, crispy texture",
        "Rich, vibrant colours",
      ],
      stock: true,
      discount: 20,
      description:
        "Capsicum, with its vibrant colors and sweet flavor, adds a delightful crunch to dishes. Packed with vitamin C and antioxidants, bell peppers promote healthy skin, boost immunity, and enhance the flavor profile of any recipe.",
    },
    {
      img_src: "/images/unsplash_grapes.jpg",
      product_name: "Grapes",
      price: 17.99,
      category: "Fruit",
      tags: [
        "Juicy snack",
        "Fresh from local Australian farms",
        "Great for fruit salads!",
      ],
      stock: true,
      discount: 0,
      description:
        "Grapes are nature's bite-sized gems, bursting with sweetness and juiciness. Whether enjoyed fresh as a snack or incorporated into salads, desserts, or even savory dishes, grapes offer a delectable burst of flavor along with a dose of vitamins and antioxidants.",
    },
    {
      img_src: "/images/unsplash_potato.jpg",
      product_name: "Potatoes",
      price: 13.99,
      category: "Starch",
      tags: [
        "Staple food",
        "Creamy and delicate when cooked",
        "Great side dish for dinner!",
      ],
      stock: true,
      discount: 0,
      description:
        "Potatoes are a versatile and comforting vegetable, loved for their rich texture and mild flavor. Whether roasted, mashed, baked, or fried, potatoes are a satisfying addition to any meal and provide essential nutrients like potassium, vitamin C, and fiber.",
    },
    {
      img_src: "/images/unsplash_strawberry.jpg",
      product_name: "Strawberries",
      price: 19.99,
      category: "Fruit",
      tags: ["Succulent fruit", "Ripe from the vine"],
      stock: true,
      discount: 30,
      description:
        "Strawberries are synonymous with summertime, offering a burst of sweetness and vibrant color. Packed with vitamin C, antioxidants, and fiber, strawberries are not only delicious but also promote heart health, skin health, and overall well-being.",
    },
    {
      img_src: "/images/unsplash_watermelon.jpg",
      product_name: "Watermelon",
      price: 15.99,
      category: "Fruit",
      tags: [
        "Summer go-to",
        "Great addition to fruit salads",
        "Delicious fruit to share",
      ],
      stock: true,
      discount: 50,
      description:
        "Refreshing and hydrating, watermelon is the epitome of summer fruit. With its juicy sweetness and high water content, watermelon is a guilt-free indulgence that also provides essential vitamins, minerals, and antioxidants for optimal health.",
    },
    {
      img_src: "/images/unsplash_peaches.jpg",
      product_name: "Peaches",
      price: 12.99,
      category: "Fruit",
      tags: [
        "Bursting with sweet flavour",
        "Versatile and perfect for snacking and beverages",
        "Rich in vitamins and antioxidants",
      ],
      stock: false,
      discount: 0,
      description:
        "Peaches, with their velvety skin and sweet juiciness, epitomize summer's essence. Whether enjoyed fresh, grilled, or baked, they offer a delightful blend of tangy and sugary flavors, evoking warmth and nostalgia in every bite. Their vibrant hue and intoxicating aroma make them a staple of seasonal dishes, reminding us to relish life's simple pleasures.",
    },
  ];
  for (product of products) {
    await db.product.create(product);
  }
}
async function seedUsers() {
  const count = await db.user.count();

  // Only seed data if necessary.
  if (count > 0) return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("123123", { type: argon2.argon2id });
  await db.user.create({
    username: "natch",
    email: "natch@gmail.com",
    password_hash: hash,
    first_name: "Natchanon",
    last_name: "Laoharawee",
    date_joined: "2024-05-09",
    account_type: "admin",
  });

  hash = await argon2.hash("123123", { type: argon2.argon2id });
  await db.user.create({
    username: "falah",
    email: "falah@gmail.com",
    password_hash: hash,
    first_name: "Falah",
    last_name: "Rasyidi",
    date_joined: "2024-05-09",
    account_type: "admin",
  });
}
module.exports = db;

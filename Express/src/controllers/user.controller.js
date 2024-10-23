// Controller for account
const db = require("../database");
const argon2 = require("argon2");

// req: what we give to database
// res: what database gives back to us
exports.all = async (req, res) => {
  const users = await db.user.findAll();
  res.json(users);
};

// Create an instance of user
exports.create = async (req, res) => {
  try {
    // initializes user variable after creating an
    //    instance of user with sequelize in SQL server
    const user = await db.user.create({
      username: req.body.username,
      password_hash: await argon2.hash(req.body.password),
      email: req.body.email,
      date_joined: req.body.date_joined,
      headline: req.body.headline,
      bio: req.body.bio,
      interests: req.body.interests,
      account_type: req.body.account_type,
    });
    res.json(user);
  } catch (error) {
    // Handle any errors
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.search = async (req, res) => {
  try {
    const { username, email } = req.query;

    console.log(username);
    console.log(email);
    let user = null;
    if (username) {
      user = await db.user.findOne({ where: { username: username } });
    } else if (email) {
      user = await db.user.findOne({ where: { email: email } });
    }
    if (user === null) {
      res.json(null);
    } else {
      res.json(user);
    }
  } catch (error) {
    console.log("Error searching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.edit = async (req, res) => {
  try {
    const { currUser, newUser } = req.body;

    const user = await db.user.findOne({
      where: { user_id: currUser.user_id },
    });

    user.username = newUser.username;
    user.email = newUser.email;
    // for password, assume that relevant security checks have been done at the frontend
    if (newUser.password != null) {
      user.password_hash = await argon2.hash(newUser.password);
    }
    user.headline = newUser.headline;
    user.bio = newUser.bio;
    user.interests = newUser.interests;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error editing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const user = await db.user.findByPk(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Query the database to check for successful login, return null otherwise
exports.login = async (req, res) => {
  try {
    const user = await db.user.findOne({ where: { email: req.query.email } });
    console.log("USER FOUND FROM DATABASE: ", user);

    // if user is not found in the database, return null
    if (user === null) {
      return res.json(null);
    }

    // Remove 'password_hash' (for security) from return object.
    const userDetails = Object.fromEntries(
      Object.entries(user.dataValues).filter(
        ([key, value]) => key !== "password_hash"
      )
    );
    if (
      !user ||
      !(await argon2.verify(user.password_hash, req.query.password))
    ) {
      res.json(null);
    } else {
      res.json(userDetails);
      console.log("\nUSER LOGGED IN: " + JSON.stringify(user) + "\n");
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

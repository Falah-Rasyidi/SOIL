// Controller for reviews
const db = require("../database");

exports.all = async (req, res) => {
  const reviews = await db.review.findAll();
  res.json(reviews);
};

exports.create = async (req, res) => {
  try {
    const review = db.review.create({
      review_id: req.body.review_id,
      product_id: req.body.product_id,
      user_id: req.body.user_id,
      rating: req.body.rating,
      description: req.body.description,
    });
    res.json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.edit = async (req, res) => {
  try {
    const review_id = req.params.review_id;
    const review = db.review.findByPk(review_id);

    review.description = req.body.description;
    await review.save();

    res.json(review);
  } catch (error) {
    console.error("Error editing review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const review_id = req.params.review_id;
    const review = db.review.findByPk(review_id);
    await review.destroy();

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

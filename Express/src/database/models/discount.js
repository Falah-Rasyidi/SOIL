// Model for discount
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "discount",
    {
      product_id: {
        type: DataTypes.INT,
        allowNull: false,
      },
      percentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disable automatic timestamps
    }
  );

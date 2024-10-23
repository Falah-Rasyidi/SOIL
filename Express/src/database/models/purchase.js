// Model for purchase
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "purchase",
    {
      purchase_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      total: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disable automatic timestamps
    }
  );

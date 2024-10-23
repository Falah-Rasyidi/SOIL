// Model for product
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "product",
    {
      product_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      img_src: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stock: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      tags: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    },
    {
      timestamps: false, // Disable automatic timestamps
    }
  );

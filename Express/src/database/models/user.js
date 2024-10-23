// Model for account
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      date_joined: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      headline: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      interests: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      account_type: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      timestamps: false, // Disable automatic timestamps
    }
  );

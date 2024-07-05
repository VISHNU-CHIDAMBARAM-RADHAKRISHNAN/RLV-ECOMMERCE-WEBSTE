module.exports = (sequelize, DataTypes) => {
  const orderdetail = sequelize.define("orderdetail", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // ProductCode: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   defaultValue: "DEFAULT_CODE",
    // },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    ProductCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductDetail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ProductCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductInventoryStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return orderdetail;
};

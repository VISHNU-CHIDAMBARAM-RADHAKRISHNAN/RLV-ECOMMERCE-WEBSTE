module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
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
    ProductCode: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      defaultValue: () => {
        const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let randomCode = "";

        for (let i = 0; i < 9; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          randomCode += characters.charAt(randomIndex);
        }

        return randomCode;
      },
    },
    ProductName: {
      type: DataTypes.STRING(5000),
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
      defaultValue: "Accessories",
    },
    ProductQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: () => Math.floor(Math.random() * (40 - 10 + 1)) + 10,
      //Math.floor(Math.random() * (max - min + 1)) + min
    },
    ProductInventoryStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: () => {
        const categories = ["INSTOCK", "LOWSTOCK"];
        const randomIndex = Math.floor(Math.random() * categories.length);
        return categories[randomIndex];
      },
    },
    ProductRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: () => Math.floor(Math.random() * 3) + 3,
    },
  });

  return Product;
};

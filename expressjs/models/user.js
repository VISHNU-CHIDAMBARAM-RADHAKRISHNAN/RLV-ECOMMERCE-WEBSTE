module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Assuming you want it to auto-increment
    },
    Name: DataTypes.STRING,
    UserName: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    Role: DataTypes.STRING,
  });

  return user;
};

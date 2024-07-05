module.exports = (sequelize, DataTypes) => {
  const adminuser = sequelize.define("adminuser", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true, // Assuming you want it to auto-increment
    },
    UserName: DataTypes.STRING,
    Password: DataTypes.STRING,
  });

  return adminuser;
};

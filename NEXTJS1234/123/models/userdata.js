module.exports = (sequelize, DataTypes) => {
  const userdata = sequelize.define("userdata", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return userdata;
};

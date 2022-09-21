module.exports = (sequelize, DataType) => {
    const User = sequelize.define("users", {
      name: {
        type: DataType.STRING
      },
      email: {
        type: DataType.STRING
      },
      password: {
        type: DataType.STRING
      }
    });
    return User;
  };
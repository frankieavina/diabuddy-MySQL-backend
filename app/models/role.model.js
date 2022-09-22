module.exports = (sequelize, DataType) => {
    const Role = sequelize.define("roles", {
      name: {
        type: DataType.STRING
      },
    },{
      timestamps: false,
      tableName: 'role'
    });

    return Role;
  };
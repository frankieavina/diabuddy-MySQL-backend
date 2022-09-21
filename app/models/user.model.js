module.exports = (sequelize , DataType) => {
    const User = sequelize.define(
        'User',
        {
            // Model attributes are defined here
            name:{
                type: DataType.STRING,
                unique: true,
                allowNull: false
            },
            email:{
                type: DataType.STRING,
                unique: true,
                allowNull: false
            },
            password:{
                type: DataType.STRING,
                allowNull: false
            }
        });
    // Post.associate = ({ Category }) => {
    //     Post.belongsTo(Category);
    // };
    return User;
};
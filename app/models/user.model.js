module.exports = (sequelize , DataType) => {
    const User = sequelize.define(
        'User',
        {
            // Model attributes are defined here
            name:{
                type: DataType.STRING,
                allowNull: false
            },
            email:{
                type: DataType.STRING,
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
module.exports = (sequelize , DataType) => {
    const User = sequelize.define(
        'User',
        {
            // dont need to specify user id but you can if you want
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
        },{
            timestamps: false,
            tableName: 'user'
        });


    return User;
};
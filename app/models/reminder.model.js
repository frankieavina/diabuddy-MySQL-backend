module.exports = (sequelize, DataType) => {
    const Reminders = sequelize.define("reminders", {
            name: {
                type: DataType.STRING
            },
            time: {
                type: DataType.DATE,
                defaultValue: DataType.NOW
            }
        },{
            timestamps: false,
            tableName: 'reminders'
        });

    return Reminders;
};
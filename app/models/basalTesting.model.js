module.exports = (sequelize, DataType) => {
    const BasalTesting = sequelize.define("basal testing", {
            time: {
                type: DataType.DATE,
                defaultValue: DataType.NOW
            },
            glucose: {
                type: DataType.INTEGER
            },
            completed: {
                type: DataType.BOOLEAN,
                defaultValue: false
            }
        },{
            timestamps: false,
            tableName: 'basal_testing'
        });

    return BasalTesting;
};

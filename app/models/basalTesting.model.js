module.exports = (sequelize, DataType) => {
    const BasalTesting = sequelize.define("basal testing", {
            numberOfTest: {
                type: DataType.STRING
            },
            glucose: {
                type: DataType.INTEGER
            },
            time: {
                type: DataType.DATE,
                defaultValue: DataType.NOW
            }
        },{
            timestamps: false,
            tableName: 'basal_testing'
        });

    return BasalTesting;
};

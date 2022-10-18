module.exports = (sequelize, DataType) => {
    const bolus = sequelize.define("bolus", {
            carbs: {
                type: DataType.STRING
            },       
            bolus: {
                type: DataType.STRING
            },
            glucose: {
                type: DataType.STRING
            },
            time: {
                type: DataType.DATE,
                defaultValue: DataType.NOW
            }
        },{
            timestamps: false,
            tableName: 'bolus'
        });

    return bolus;
};
module.exports = (sequelize, DataType) => {
    const BasalTesting = sequelize.define("basal testing", {
            user_name: {
            type: DataType.STRING
            },
            user_id: {
            type: DataType.INTEGER
            },
            time: {
            type: DataType.DATETIME,
            defaultValue: DataType.NOW
            },
            glucose: {
            type: DataType.INTEGER
            },
            completed: {
            type: DataType.BOOLEAN,
            defaultValue: false
            }
        });
    return Property;
    };
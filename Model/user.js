module.exports = (sequelize, type) => {
    return sequelize.define('User', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: type.STRING,
        last_name: type.STRING,
        email: {
            type: type.STRING,
            required: true
        },
        password: {
            type: type.STRING,
            required: true
        },
        created: {
            type: type.DATETIME2,
            allowNull: false,
        },

    });

};
module.exports = (sequelize, type) => {

    var pacman = sequelize.define('pacman', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        age: type.INTEGER,
        famille: {
            type: type.STRING,
            allowNull: false,
        },
        couleur: {
            type: type.STRING,
            allowNull: false,
        },
        nourriture: {
            type: type.STRING,
            allowNull: false,
        },


    });
    pacman.associate = function(models) {
        models.pacman.hasMany(models.pacman);
    };
    return user ;

};
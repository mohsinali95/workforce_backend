

module.exports = (sequelize, DataTypes) => {
    var model = sequelize.define('role', {
        name: {
            type: DataTypes.STRING
        }
    })

    // model.associate = function (models) {
    //     this.hasMany(models.admin, { as: 'userRole', foreignKey: 'roleId' })
    // }
    return model;
}
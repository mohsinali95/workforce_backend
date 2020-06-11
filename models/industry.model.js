module.exports = (sequelize, DataTypes) => {
    let model = sequelize.define('industry', {

        // email: {
        //     type: DataTypes.STRING,
        //     unique: true
        // },
        // password: {
        //     type: DataTypes.STRING,
        // },
        // phone: {
        //     type: DataTypes.STRING,
        // },
        name: {
            type: DataTypes.STRING,

        },
        // image: {
        //     type: DataTypes.STRING,
        // },
        isActive: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        // adminId: {
        //     type: DataTypes.INTEGER
        // },

    })
    // model.associate = function (models) {

        // this.belongsTo(models.user, {
        //     as: 'admin', foreignKey: 'adminId',
        //     foreignKeyConstraint: true,
        //     onDelete: 'cascade'
        // })

    // }

    return model
}
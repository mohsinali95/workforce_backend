module.exports = (sequelize, DataTypes) => {
    let model = sequelize.define('place', {
        name: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        // street: {
        //     type: DataTypes.STRING
        // },
        address: {
            type: DataTypes.STRING
        },
        postalCode: {
            type: DataTypes.STRING
        },
        createdBy: {
            type: DataTypes.INTEGER,

        }
    })
    model.associate = function (models) {
        this.belongsTo(models.user,{
            as: 'createdby', foreignKey: 'createdBy',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })

        this.belongsToMany(models.user, {
            through: { model: models.userPlace },
            foreignKey: 'placeId',
            foreignKeyConstraint: true,
            onDelete: 'cascade',
        });
    }

    return model
}
module.exports = (sequelize, DataTypes) => {
    let model = sequelize.define('userPlace', {
        userId: {
            type: DataTypes.INTEGER
        },
        placeId: {
            type: DataTypes.INTEGER
        },
        createdBy: {
            type: DataTypes.INTEGER
        }
    })

    model.associate = function (models) {
        this.belongsTo(models.user, {
            as: 'user', foreignKey: 'userId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })

        this.belongsTo(models.place, {
            as: 'place',
            foreignKey: 'placeId',
            foreignKeyConstraint: true,
            onDelete: 'cascade',
        });
    }
    return model;
}
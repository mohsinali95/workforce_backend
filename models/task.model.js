module.exports = (sequelize, DataTypes) => {
    let model = sequelize.define('task', {

        title: {
            type: DataTypes.STRING,
        },
        isCompulsory: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        date: {
            type: DataTypes.DATEONLY,
        },
        adminId: {
            type: DataTypes.INTEGER
        },
        industryId: {
            type: DataTypes.INTEGER
        },
        

    })
    model.associate = function (models) {

        this.belongsTo(models.user, {
            as: 'admin', foreignKey: 'adminId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })


        this.belongsTo(models.industry, {
            as: 'industry', foreignKey: 'industryId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })

        this.belongsToMany(models.user, {
            through: { model: models.userTask },
           
            foreignKey: 'taskId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        });


    }

    return model
}
module.exports = (sequelize, DataTypes) => {
    let model = sequelize.define('userTask', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER
        },
        taskId: {
            type: DataTypes.INTEGER
        },
        adminId: {
            type: DataTypes.INTEGER
        },
        isCorrect: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATEONLY
        },
        remarks: {
            type: DataTypes.TEXT,
        },
        image: {
            type: DataTypes.STRING,
        },
        placeId: {
            type: DataTypes.INTEGER,
        },
    })
    model.associate = function (models) {
        this.belongsTo(models.task, {
            as: 'usersTask', foreignKey: 'taskId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })
    }
    return model;
}
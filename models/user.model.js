module.exports = (sequelize, DataTypes) => {
    let model = sequelize.define('user', {

        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
        },
        phone: {
            type: DataTypes.STRING,
        },
        name: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        isActive: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        isEmailVerfied: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        adminId: {
            type: DataTypes.INTEGER
        },
        roleId: {
            type: DataTypes.INTEGER
        },
        companyName: {
            type: DataTypes.STRING
        },
        street: {
            type: DataTypes.STRING
        },
        unit: {
            type: DataTypes.STRING
        },
        postalCode: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        country: {
            type: DataTypes.STRING
        },
        industryId: {
            type: DataTypes.INTEGER
            
        },
        isLoginAllowed: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }

    })
    model.associate = function (models) {
        this.belongsTo(models.role, {
            as: 'role',
            foreignKey: 'roleId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })
        this.belongsTo(models.user, {
            as: 'admin', foreignKey: 'adminId',
            foreignKeyConstraint: true,
            onDelete: 'cascade'
        })

       
        this.belongsToMany(models.task, {
            through: { model: models.userTask },
            foreignKey: 'userId',
            foreignKeyConstraint: true,
            onDelete: 'cascade',
        });

        this.belongsToMany(models.place, {
            through: { model: models.userPlace },
            foreignKey: 'userId',
            foreignKeyConstraint: true,
            onDelete: 'cascade',
        });
        this.belongsTo(models.industry, {
            foreignKeyConstraint: true,
            onDelete: 'cascade',
            as: "industry",
            foreignKey: 'industryId'
        });

    }

    return model
}
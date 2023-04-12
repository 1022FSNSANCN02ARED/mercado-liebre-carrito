const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const model = sequelize.define(
        "CartProduct",
        {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            count: DataTypes.INTEGER.UNSIGNED,
        },
        {
            tableName: "CartProduct",
            timestamps: false,
        }
    );

    model.associate = (models) => {
        model.belongsTo(models.Product, {
            as: "product",
        });
        model.belongsTo(models.User, {
            as: "user",
        });
    };

    return model;
};

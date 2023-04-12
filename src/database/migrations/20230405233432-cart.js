"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("CartProduct", {
            id: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
            },
            count: {
                allowNull: false,
                type: DataTypes.INTEGER.UNSIGNED,
                defaultValue: 1,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id",
                },
            },
            productId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Products",
                    key: "id",
                },
            },
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("CartProduct");
    },
};

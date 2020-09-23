const { Model, DataTypes } = require('sequelize')

class Tech extends Model {}

module.exports.initModel = (sequelize) =>
  Tech.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      repositoryId: DataTypes.INTEGER,
      name: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: 'Tech',
      tableName: 'techs',
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    },
  )

module.exports.associate = () => {}

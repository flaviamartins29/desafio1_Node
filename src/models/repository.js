const { Model, DataTypes } = require('sequelize')

class Repository extends Model {}

module.exports.initModel = (sequelize) =>
  Repository.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: DataTypes.STRING(100),
      url: DataTypes.STRING(256),
      likes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Repository',
      tableName: 'repositories',
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    },
  )

module.exports.associate = ({ Repository, Tech }) => {
  Repository.hasMany(Tech, {
    as: 'techs',
    foreignKey: 'repository_id',
  })
}

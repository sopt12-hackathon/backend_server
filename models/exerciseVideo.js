module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'EXERCISE_VIDEO_TB',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      runtime: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      link: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      timeCategory: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    },
  );

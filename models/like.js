const { User, ExerciseVideo } = require('./index');

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'LIKE_TB',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      isLike: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        reference: {
          model: User,
          key: 'id',
        },
      },
      videoId: {
        type: DataTypes.INTEGER,
        reference: {
          model: ExerciseVideo,
          key: 'id',
        },
      },
    },
    {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    },
  );

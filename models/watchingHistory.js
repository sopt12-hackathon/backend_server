const { User, ExerciseVideo } = require('./index');

module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'WATCHING_HISTORY_TB',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      videoId: {
        type: DataTypes.INTEGER,
        reference: {
          model: ExerciseVideo,
          key: 'id',
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        reference: {
          model: User,
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

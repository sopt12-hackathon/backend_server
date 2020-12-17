const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.ExerciseVideo = require('./exerciseVideo')(sequelize, Sequelize);
db.Like = require('./like')(sequelize, Sequelize);
db.WatchingHistory = require('./watchingHistory')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

/* 1 : N  Video : Hashtag */
db.ExerciseVideo.hasMany(db.Hashtag, {
  onDelete: 'cascade',
  foreignKey: 'videoId',
  sourceKey: 'id',
});
db.Hashtag.belongsTo(db.ExerciseVideo, {
  foreignKey: 'videoId',
  targetKey: 'id',
});

/* 1 : N   Video : WatchingHistory */
db.ExerciseVideo.hasMany(db.WatchingHistory, {
  onDelete: 'cascade',
  foreignKey: 'videoId',
  sourceKey: 'id',
});
db.WatchingHistory.belongsTo(db.ExerciseVideo, {
  foreignKey: 'videoId',
  targetKey: 'id',
});

/* 1 : N   User : WatchingHistory */
db.User.hasMany(db.WatchingHistory, {
  onDelete: 'cascade',
  foreignKey: 'userId',
  sourceKey: 'id',
});
db.WatchingHistory.belongsTo(db.User, {
  foreignKey: 'userId',
  targetKey: 'id',
});

/* M : N   User : Video => Like */
db.User.belongsToMany(db.ExerciseVideo, {
  through: db.Like,
  foreignKey: 'userId',
});
db.ExerciseVideo.belongsToMany(db.User, {
  through: db.Like,
  foreignKey: 'videoId',
});

module.exports = db;

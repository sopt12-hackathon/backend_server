const crypto = require('crypto');
const { User } = require('../models');

module.exports = {
  checkEmail: async email => {
    const alreadyEmail = await User.findOne({
      where: {
        email,
      },
    });
    return alreadyEmail;
  },
  signup: async (email, name, password) => {
    const salt = crypto.randomBytes(64).toString('base64');
    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('base64');
    const user = await User.create({
      email,
      userName: name,
      password: hashedPassword,
      salt,
    });
    return user;
  },
};

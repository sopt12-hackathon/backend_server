/* eslint-disable max-len */
// // const { Op } = require('sequelize');
// // const jwt = require('jsonwebtoken');
// const crypto = require('crypto');
// // const dotenv = require('dotenv');
// // const moment = require('moment');

const ut = require('../modules/util');
const rm = require('../modules/responseMessage');
const sc = require('../modules/statusCode');

// const { User, ExerciseVideo, WatchingHistory } = require('../models');
const userService = require('../service/userService');

// // dotenv.config();

module.exports = {
  signup: async (req, res) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      console.log('필요한 값이 없습니다!');
      return res
        .status(sc.BAD_REQUEST)
        .send(ut.fail(sc.BAD_REQUEST, rm.NULL_VALUE));
    }
    try {
      const checkEmail = await userService.checkEmail(email);
      if (checkEmail) {
        console.log('이미 존재하는 이메일입니다.');
        return res
          .status(sc.BAD_REQUEST)
          .send(ut.fail(sc.BAD_REQUEST, rm.ALREADY_EMAIL));
      }

      const user = await userService.signup(email, name, password);

      return res.status(sc.OK).send(
        ut.success(sc.OK, rm.SIGN_UP_SUCCESS, {
          id: user.id,
          email: user.email,
          userName: user.userName,
        }),
      );
    } catch (error) {
      console.log(error);
      return res
        .status(sc.INTERNAL_SERVER_ERROR)
        .send(ut.fail(sc.INTERNAL_SERVER_ERROR, rm.SIGN_UP_FAIL));
    }
  },
  //   signin: async (req, res) => {
  //     try {

  //     } catch (error) {

  //     }
  //   }
  //   history: async (req, res) => {
  //     try {

  //     } catch (error) {

  //     }
  //   }
  //   profile: async (req, res) => {
  //     try {

  //     } catch (error) {

  //     }
  //   },
  //   readAll: async (req, res) => {
  //     try {

  //     } catch (error) {

  //     }
  //   },
  //   readOne: async (req, res) => {
  //     try {

  //     } catch (error) {

  //     }
  //   },
};

'use strict';

const util = require('util');
const mysql = require('mysql');
const { response } = require('express');
const { addUser, findUserByPhone } = require('../service/user.service');
const sendOTP = require('../service/otp/sendOTP');
const verifyOTP = require('../service/otp/verifyOTP');

module.exports = {
  addUser: async (req, res) => {
    try {
      var data = req.body;
      const result = await addUser(data);
      if (result) {
        res.json({
          success: true,
          message: 'Create succcessful',
          data: result.dataValues,
        });
      } else {
        res.json({
          success: false,
          message: 'Create failed',
          data: req.body,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error,
        req: req.body,
      });
    }
  },
  sendOTP: async (req, res) => {
    try {
      var phoneNumber = req.body.phoneNumber;
      await sendOTP(phoneNumber)
        .then(pinId => {
          res.json({
            success: true,
            message: 'Send OTP succcessful',
            data: pinId,
          });
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error,
        req: req.body,
      });
    }
  },
  verifyOTP: async (req, res) => {
    try {
      var { pin, pinId } = req.body;
      await verifyOTP(pin, pinId)
        .then(result => {
          if (result.verified) {
            res.json({
              success: true,
              message: 'Verify OTP succcessful',
            });
          } else {
            res.json({
              success: false,
              message: 'Wrong OTP',
              attemptsRemaining: result.attemptsRemaining,
            });
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error,
        req: req.body,
      });
    }
  },
  findUserByPhone: async (req, res) => {
    try {
      var phoneNumber = req.body.phoneNumber;
      const user = await findUserByPhone(phoneNumber);
      if (user === null) {
        res.json({ success: false, message: 'No one was found' });
      } else {
        res.json({
          success: true,
          message: 'Find user successful',
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error,
        req: req.body,
      });
    }
  },
};

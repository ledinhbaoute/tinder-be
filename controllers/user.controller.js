'use strict';

const util = require('util');
const mysql = require('mysql');
const { response } = require('express');
const { addUser } = require('../service/user.service');

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

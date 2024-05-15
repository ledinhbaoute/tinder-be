'use strict';

const util = require('util');
const mysql = require('mysql');
const { response } = require('express');
const { addUserPhoto } = require('../service/userphoto.service');
const { upload, uploadDir } = require('../helpers/storageImg');

module.exports = {
  addUserPhoto: async (req, res) => {
    try {
      await upload(async (req, res, err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Lỗi khi upload ảnh' });
        }
        const uploadedImage = req.body.photo;
        const imageUrl = `${req.protocol}://${req.get('host')}/${uploadDir}${
          uploadedImage.filename
        }`;
        console.log('Đường dẫn ảnh:', imageUrl);
        await addUserPhoto(req.body.userId, imageUrl);
        res.json({ success: true, message: 'Upload ảnh thành công' });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: error,
        req: req.body,
      });
    }
  },
};

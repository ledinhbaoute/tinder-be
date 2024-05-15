const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadDir = 'uploads/';

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = uuidv4() + ext;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage }).single('image');

module.exports = { upload, uploadDir };

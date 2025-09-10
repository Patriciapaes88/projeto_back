const multer = require('multer');
const path = require('path');
const fs = require('fs');

const pastaUploads = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(pastaUploads)) {
  fs.mkdirSync(pastaUploads);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pastaUploads);
  },
  filename: (req, file, cb) => {
    const nomeFinal = Date.now() + '-' + file.originalname;
    cb(null, nomeFinal);
  }
});

const upload = multer({ storage });
module.exports = upload;

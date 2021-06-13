const path = require('path');
const multer = require('multer');
const uuid = require('uuid');

var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, callback) => {
    //  const match = ['image/png', 'image/jpeg'];

    //  if (match.indexOf(file.mimetype) === -1) {
    //    var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
    //     return callback(message, null);
    //   }

    var filename = (null, uuid.v4() + path.extname(file.originalname));
    callback(null, filename);
  },
});

var uploadFiles = multer({ storage: storage }).fields([
  { name: 'desktopImg', maxCount: 1 },
  { name: 'mobImg', maxCount: 1 },
]);

module.exports = uploadFiles;

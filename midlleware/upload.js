const moment = require('moment');
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, callback){
        let path = `./public/uploads//`;

        callback(null, path)
    },
    filename(req, file, callback){
        // const date = moment().format('DDMMYYYY-HHmmss_SSS');
        function randomInt(min, max) {
            return min + Math.floor((max - min) * Math.random());
        }

        const random = randomInt(10, 400);

        callback(null, `${random}-${file.originalname}`)
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image.jpg') {
            callback(null, true);
        } else {
            callback(null, false);
        }
}
const limits = { fileSize: 1024 * 1024 * 5 }

module.exports = multer({ storage, fileFilter, limits });
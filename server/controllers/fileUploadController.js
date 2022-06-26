const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cd) => {
    cd(null, "public/profilePicture");
  },
  filename: (req, file, cd) => {
    const imageFileName = Date.now() + "--" + file.originalname;
    cd(null, imageFileName);
    req.filename = imageFileName;
  },
});
const upload = multer({ storage }).single("file");

module.exports = {
  upload,
};

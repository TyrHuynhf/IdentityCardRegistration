
const multers = require("multer");
export const {GridFsStorage} = require("multer-gridfs-storage");
const storage = new GridFsStorage({
    url: `mongodb+srv://tyrhdev:tyhuynh@card-identity-registrat.wxfmn.mongodb.net/card-identity-registration?retryWrites=true&w=majority`,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `fingerprint-${req.params.id}`;
            return filename;
        }

        return {
            bucketName: "fingerprint",
            filename: `fingerprint-${req.params.id}`,
        };
    },
});

module.exports = multers({ storage });
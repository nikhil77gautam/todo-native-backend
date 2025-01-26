import cryptoRandomString from "crypto-random-string";
import multer from "multer";
import path from "path";

/-------------------Image Upload via Multer---------------------------/;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPaths = {
      todoThumbnail: "uploads/todoThumbnail",
    };

    const uploadPath =
      uploadPaths[file.fieldname] ||
      path.join("uploads", req.params.fileCategory);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = cryptoRandomString({ length: 10, type: "alphanumeric" });
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileExtensionFilter = (req, file, cb) => {
  const allowedMimetypes = [
    "application/pdf",
    "video/mp4",
    "audio/mpeg",
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/avif",
  ];

  if (allowedMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only PDF, MP3, JPG, PNG, JPEG, and WebP files are allowed!"),
      false
    );
  }
};

const imgUpload = multer({
  storage,
  fileFilter: fileExtensionFilter,
  limits: { fileSize: 1024 * 1024 * 10 },
});

export const uploadFile = (req, res, next) => {
  const upload = imgUpload.fields([{ name: "todoThumbnail", maxCount: 10 }]);

  upload(req, res, async (err) => {
    if (err) return next(err);

    const imageFields = ["todoThumbnail"];
    next();
  });
};

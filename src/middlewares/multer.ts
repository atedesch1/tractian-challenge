import multer from 'multer'

const storage = multer.diskStorage({ destination: 'images/' })

const imageFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Only image files are allowed'))
  }
  cb(null, true)
}

const upload = multer({ storage, fileFilter: imageFilter })

export default upload

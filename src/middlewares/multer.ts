import multer from 'multer'
import path from 'path';

export const imageDestination = path.resolve('/images')

const storage = multer.diskStorage({ destination: imageDestination })

const imageFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.originalname.match(/\.(jpg)$/)) {
    return cb(new Error('Only image files of type jpg are allowed'))
  }
  cb(null, true)
}

const upload = multer({ storage, fileFilter: imageFilter })

export default upload

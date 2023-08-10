import express from 'express';
import { createAsset, getAssets } from '../controllers/asset_controller';
import { authenticate } from '../middlewares/auth';
import upload from '../middlewares/multer';

const router = express.Router();

router.post('/', authenticate, upload.single('image'), createAsset);
router.get('/', getAssets);

export default router;

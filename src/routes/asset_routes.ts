import express from 'express';
import { createAsset, getAssets, getAssetImage } from '../controllers/asset_controller';
import { authenticate, authenticateManager } from '../middlewares/auth';
import upload from '../middlewares/multer';

const router = express.Router();

router.post('/', upload.single('image'), authenticateManager, createAsset);
router.get('/:id/image', authenticate, getAssetImage);
router.get('/', getAssets);

export default router;

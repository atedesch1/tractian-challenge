import express from 'express';
import { createAsset, getAssets } from '../controllers/asset_controller';
import { authenticateManager } from '../middlewares/auth';
import upload from '../middlewares/multer';

const router = express.Router();

router.post('/', upload.single('image'), authenticateManager, createAsset);
router.get('/', getAssets);

export default router;

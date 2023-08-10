import express from 'express';
import { registerUnit, getUnits } from '../controllers/unit_controller';
import { authenticate, authenticateManager } from '../middlewares/auth';

const router = express.Router();

router.get('/', getUnits);
router.post('/', authenticateManager, registerUnit);

export default router;

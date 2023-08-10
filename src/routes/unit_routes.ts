import express from 'express';
import { registerUnit, getUnits, getUnit } from '../controllers/unit_controller';
import { authenticate, authenticateManager } from '../middlewares/auth';

const router = express.Router();

router.get('/', getUnits);
router.get('/:id', authenticate, getUnit);
router.post('/', authenticateManager, registerUnit);

export default router;

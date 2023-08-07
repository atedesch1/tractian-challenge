import express from 'express';
import { registerUnit, getUnits } from '../controllers/unit_controller';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/', getUnits);
router.post('/', authenticate, registerUnit);

export default router;

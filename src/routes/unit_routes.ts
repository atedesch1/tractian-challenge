import express from 'express';
import { registerUnit, getUnits } from '../controllers/unit_controller';

const router = express.Router();

router.get('/', getUnits);
router.post('/', registerUnit);

export default router;

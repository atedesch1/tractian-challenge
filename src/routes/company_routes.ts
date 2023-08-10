import express from 'express';
import { getCompanies, updateCompany, updateCompanyMember } from '../controllers/company_controller';
import { authenticate, authenticateManager } from '../middlewares/auth';

const router = express.Router();

router.get('/', getCompanies);
router.put('/', authenticateManager, updateCompany);
router.put('/members/:id', authenticateManager, updateCompanyMember);

export default router;

import express from 'express';
import { getCompanies, updateCompany, updateCompanyMember } from '../controllers/company_controller';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/', getCompanies);
router.put('/', authenticate, updateCompany);
router.put('/members/:id', authenticate, updateCompanyMember);

export default router;

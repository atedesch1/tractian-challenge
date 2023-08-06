import express from 'express';
import { getCompanies, updateCompany, updateCompanyMember } from '../controllers/company_controller';

const router = express.Router();

router.get('/', getCompanies);
router.put('/:id', updateCompany);
router.put('/members/:id', updateCompanyMember);

export default router;

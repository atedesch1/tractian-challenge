import express from 'express';
import { createCompany, deleteCompany, getCompanies, updateCompany } from '../controllers/company_controller';

const router = express.Router();

router.post('/', createCompany);
router.get('/', getCompanies);
router.put('/:id', updateCompany);
router.delete('/:id', deleteCompany);

export default router;

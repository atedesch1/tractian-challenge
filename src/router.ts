import companyRoutes from './routes/company_routes';
import userRoutes from './routes/user_routes';

import express from 'express';
const router = express.Router();

router.use('/companies', companyRoutes);
router.use('/users', userRoutes);

router.get('/', (_req, res) => {
    res.send('It works!');
});

export default router;

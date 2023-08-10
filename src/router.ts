import companyRoutes from './routes/company_routes';
import userRoutes from './routes/user_routes';
import unitRoutes from './routes/unit_routes';
import assetRoutes from './routes/asset_routes';

import express from 'express';
const router = express.Router();

router.use('/companies', companyRoutes);
router.use('/users', userRoutes);
router.use('/units', unitRoutes);
router.use('/assets', assetRoutes);

router.get('/', (_req, res) => {
    res.send('It works!');
});

export default router;

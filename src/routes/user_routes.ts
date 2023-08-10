import express from 'express';
import { getUsers, registerUser, inviteUser } from '../controllers/user_controller'
import { authenticateManager } from '../middlewares/auth';

const router = express.Router();

router.get('/', getUsers);
router.post('/', registerUser);
router.post('/invite', authenticateManager, inviteUser);

export default router;

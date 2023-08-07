import express from 'express';
import { getUsers, registerUser, inviteUser } from '../controllers/user_controller'
import { authenticate } from '../middlewares/auth';

const router = express.Router();

router.get('/', getUsers);
router.post('/', registerUser);
router.post('/invite', authenticate, inviteUser);

export default router;

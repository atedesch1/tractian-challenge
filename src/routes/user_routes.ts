import express from 'express';
import { getUsers, registerUser, inviteUser } from '../controllers/user_controller'

const router = express.Router();

router.get('/', getUsers);
router.post('/', registerUser);
router.post('/invite', inviteUser);

export default router;

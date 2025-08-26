import express from 'express';
const router = express.Router();
import { login_user, logout_user, register_user,get_current_user } from '../controller/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

router.post('/register', register_user);
router.post('/login', login_user);
router.post("/logout", logout_user)
router.get('/me', authMiddleware, get_current_user);
export default router;

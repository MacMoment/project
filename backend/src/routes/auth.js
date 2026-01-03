import express from 'express';
import { signup, login, verifyTwoFactor, passkeyOptions } from '../controllers/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/2fa/verify', verifyTwoFactor);
router.post('/passkey/options', passkeyOptions);

export default router;

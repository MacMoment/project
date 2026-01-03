import {
  sanitizeUser,
  createUser,
  findUserByEmail,
  verifyPassword,
  createTwoFactorChallenge,
  verifyTwoFactorChallenge,
} from '../models/auth.js';

const validatePassword = (password) => typeof password === 'string' && password.trim().length >= 8;

export const signup = (req, res) => {
  const { name, email, password, twoFactorMethod } = req.body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Name is required.' });
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Valid email is required.' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ success: false, error: 'Password must be at least 8 characters.' });
  }

  if (twoFactorMethod && !['authenticator', 'sms', 'email'].includes(twoFactorMethod)) {
    return res.status(400).json({ success: false, error: 'Invalid 2FA method.' });
  }

  const { user, error } = createUser({
    name: name.trim(),
    email: email.trim(),
    password,
    twoFactorMethod,
  });

  if (error) {
    return res.status(409).json({ success: false, error });
  }

  let challenge = null;
  if (user.twoFactorEnabled) {
    challenge = createTwoFactorChallenge(user);
  }

  return res.status(201).json({
    success: true,
    data: {
      user: sanitizeUser(user),
      requiresTwoFactor: Boolean(challenge),
      challengeId: challenge?.challengeId,
      twoFactorHint: challenge?.hint,
    },
    message: 'Account created successfully.',
  });
};

export const login = (req, res) => {
  const { email, password, mode } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ success: false, error: 'Valid email is required.' });
  }

  if (!validatePassword(password)) {
    return res.status(400).json({ success: false, error: 'Password must be at least 8 characters.' });
  }

  const user = findUserByEmail(email.trim());

  if (!user) {
    return res.status(404).json({ success: false, error: 'Account not found.' });
  }

  if (mode === 'admin' && user.role !== 'admin') {
    return res.status(403).json({ success: false, error: 'This account does not have admin access.' });
  }

  if (!verifyPassword(user, password)) {
    return res.status(401).json({ success: false, error: 'Incorrect password.' });
  }

  let challenge = null;
  if (user.twoFactorEnabled) {
    challenge = createTwoFactorChallenge(user);
  }

  return res.status(200).json({
    success: true,
    data: {
      user: sanitizeUser(user),
      requiresTwoFactor: Boolean(challenge),
      challengeId: challenge?.challengeId,
      twoFactorHint: challenge?.hint,
    },
    message: 'Login successful.',
  });
};

export const verifyTwoFactor = (req, res) => {
  const { challengeId, code } = req.body;

  if (!challengeId || typeof challengeId !== 'string') {
    return res.status(400).json({ success: false, error: 'Challenge ID is required.' });
  }

  if (!code || typeof code !== 'string') {
    return res.status(400).json({ success: false, error: 'Verification code is required.' });
  }

  const result = verifyTwoFactorChallenge(challengeId, code.trim());
  if (!result.valid) {
    return res.status(401).json({ success: false, error: result.reason || 'Verification failed.' });
  }

  return res.status(200).json({
    success: true,
    data: {
      user: sanitizeUser(result.user),
    },
    message: 'Two-factor verification successful.',
  });
};

export const passkeyOptions = (req, res) => {
  const { email } = req.body || {};
  const user = email ? findUserByEmail(email) : null;
  const passkeyEnabled = user?.passkeyEnabled;

  return res.status(200).json({
    success: true,
    data: {
      passkeyEnabled: Boolean(passkeyEnabled),
      message: passkeyEnabled
        ? 'Passkey sign-in is available for this account.'
        : 'A passkey prompt would open here on supported devices.',
    },
  });
};

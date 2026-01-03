import crypto from 'crypto';

const createId = () => (crypto.randomUUID ? crypto.randomUUID().split('-')[0] : crypto.randomBytes(4).toString('hex'));

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.pbkdf2Sync(password, salt, 120000, 64, 'sha512').toString('hex');
  return { salt, hash };
};

const sanitizeUser = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  twoFactorEnabled: user.twoFactorEnabled,
  twoFactorMethod: user.twoFactorMethod,
  passkeyEnabled: user.passkeyEnabled,
});

const twoFactorDemoCodes = {
  authenticator: '123456',
  sms: '654321',
  email: '111111',
};

const users = [];

const seedUsers = () => {
  if (users.length) return;

  const adminPassword = hashPassword('AdminPass123!');
  users.push({
    id: 'admin-1',
    name: 'John Admin',
    email: 'john@academystudios.com',
    role: 'admin',
    passwordHash: adminPassword.hash,
    passwordSalt: adminPassword.salt,
    twoFactorEnabled: true,
    twoFactorMethod: 'authenticator',
    passkeyEnabled: false,
  });

  const customerPassword = hashPassword('Welcome123!');
  users.push({
    id: 'cust-1',
    name: 'Alex Gaming',
    email: 'alex@gaming.com',
    role: 'customer',
    passwordHash: customerPassword.hash,
    passwordSalt: customerPassword.salt,
    twoFactorEnabled: true,
    twoFactorMethod: 'sms',
    passkeyEnabled: true,
  });
};

seedUsers();

const challenges = new Map();

const createTwoFactorChallenge = (user) => {
  const challengeId = `2fa-${createId()}`;
  const expiresAt = Date.now() + 5 * 60 * 1000;
  challenges.set(challengeId, {
    userId: user.id,
    method: user.twoFactorMethod,
    expiresAt,
  });
  return {
    challengeId,
    hint: `Use demo code ${twoFactorDemoCodes[user.twoFactorMethod]} to complete sign-in.`,
  };
};

const verifyTwoFactorChallenge = (challengeId, code) => {
  const challenge = challenges.get(challengeId);
  if (!challenge) {
    return { valid: false, reason: 'Challenge not found.' };
  }
  if (challenge.expiresAt < Date.now()) {
    challenges.delete(challengeId);
    return { valid: false, reason: 'Challenge expired.' };
  }

  const expected = twoFactorDemoCodes[challenge.method];
  if (code !== expected) {
    return { valid: false, reason: 'Invalid verification code.' };
  }

  challenges.delete(challengeId);
  const user = users.find((item) => item.id === challenge.userId);
  return { valid: Boolean(user), user };
};

const createUser = ({ name, email, password, role = 'customer', twoFactorMethod }) => {
  const existing = users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { error: 'An account with this email already exists.' };
  }

  const passwordData = hashPassword(password);
  const user = {
    id: createId(),
    name,
    email,
    role,
    passwordHash: passwordData.hash,
    passwordSalt: passwordData.salt,
    twoFactorEnabled: Boolean(twoFactorMethod),
    twoFactorMethod: twoFactorMethod || null,
    passkeyEnabled: false,
  };
  users.push(user);
  return { user };
};

const findUserByEmail = (email) => users.find((user) => user.email.toLowerCase() === email.toLowerCase());

const verifyPassword = (user, password) => {
  const { hash } = hashPassword(password, user.passwordSalt);
  return hash === user.passwordHash;
};

export {
  sanitizeUser,
  createUser,
  findUserByEmail,
  verifyPassword,
  createTwoFactorChallenge,
  verifyTwoFactorChallenge,
};

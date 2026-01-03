import { useState } from 'react';
import { LogIn, UserPlus, ShieldCheck, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../store/adminStore';
import { useAuthStore, type AuthUser } from '../../store/authStore';
import { authApi } from '../../services/api';

type AuthMode = 'admin' | 'customer';

export function AuthPanel({ mode }: { mode: AuthMode }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [twoFactorMethod, setTwoFactorMethod] = useState('authenticator');
  const [passkeyNotice, setPasskeyNotice] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [twoFactorChallengeId, setTwoFactorChallengeId] = useState('');
  const [twoFactorHint, setTwoFactorHint] = useState('');
  const [pendingUser, setPendingUser] = useState<AuthUser | null>(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { addUser } = useAdminStore();
  const isAdminMode = mode === 'admin';

  const modeTitle = isAdminMode ? 'Admin Access' : 'Customer Portal';
  const modeDescription = isAdminMode
    ? 'Sign in with the primary admin account to manage the store.'
    : 'Log in or create an account to view your purchases and invoices.';

  const resetTwoFactor = () => {
    setTwoFactorChallengeId('');
    setTwoFactorCode('');
    setTwoFactorHint('');
    setPendingUser(null);
  };

  const handlePasskey = async () => {
    setPasskeyNotice('');
    setError('');
    setStatusMessage('');

    try {
      setIsSubmitting(true);
      const response = await authApi.passkeyOptions({ email: email.trim() || undefined });
      setPasskeyNotice(response.data.message);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to load passkey options.';
      setPasskeyNotice(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setStatusMessage('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!trimmedPassword) {
      setError('Please enter your password to continue.');
      return;
    }

    if (isSignup) {
      if (isAdminMode) {
        setError('Admin accounts are created by the primary admin only.');
        return;
      }

      if (!trimmedName) {
        setError('Please enter your name.');
        return;
      }

      if (trimmedPassword.length < 8) {
        setError('Create a password with at least 8 characters.');
        return;
      }

      if (trimmedPassword !== confirmPassword.trim()) {
        setError('Passwords do not match. Please re-enter them.');
        return;
      }

      try {
        setIsSubmitting(true);
        const response = await authApi.signup({
          name: trimmedName,
          email: trimmedEmail,
          password: trimmedPassword,
          twoFactorMethod,
        });
        const { user, requiresTwoFactor, challengeId, twoFactorHint: hint } = response.data;
        addUser({
          name: user.name,
          email: user.email,
          status: 'active',
          role: 'customer',
          lastActive: 'Now',
        });

        if (requiresTwoFactor && challengeId) {
          setPendingUser(user);
          setTwoFactorChallengeId(challengeId);
          setTwoFactorHint(hint || '');
          setStatusMessage('Enter the 2FA code to finish creating your account.');
          return;
        }

        login(user);
        navigate('/account');
        return;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to create account.');
        return;
      } finally {
        setIsSubmitting(false);
      }
    }

    try {
      setIsSubmitting(true);
      const response = await authApi.login({
        email: trimmedEmail,
        password: trimmedPassword,
        mode,
      });
      const { user, requiresTwoFactor, challengeId, twoFactorHint: hint } = response.data;

      if (requiresTwoFactor && challengeId) {
        setPendingUser(user);
        setTwoFactorChallengeId(challengeId);
        setTwoFactorHint(hint || '');
        setStatusMessage('Enter the 2FA code to finish signing in.');
        return;
      }

      login(user);
      navigate(isAdminMode ? '/admin/panel' : '/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTwoFactorSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setStatusMessage('');

    if (!twoFactorCode.trim()) {
      setError('Enter the 2FA code to continue.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await authApi.verifyTwoFactor({
        challengeId: twoFactorChallengeId,
        code: twoFactorCode.trim(),
      });
      const user = response.data.user;
      login(user);
      resetTwoFactor();
      navigate(user.role === 'admin' ? '/admin/panel' : '/account');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to verify code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple-200/50 via-pink-200/30 to-blue-200/40 blur-2xl opacity-70" />
      <div className="relative w-full bg-white/90 border border-white/70 rounded-3xl shadow-xl p-8 sm:p-10 backdrop-blur">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            {isAdminMode ? <ShieldCheck size={22} className="text-white" /> : <User size={22} className="text-white" />}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{modeTitle}</h1>
            <p className="text-sm text-gray-500">{modeDescription}</p>
          </div>
        </div>

        {!isAdminMode && (
          <div className="flex gap-3 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsSignup(false);
                setError('');
                setStatusMessage('');
                resetTwoFactor();
              }}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition ${
                !isSignup ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-200 hover:border-purple-200'
              }`}
            >
              <span className="inline-flex items-center gap-2 justify-center">
                <LogIn size={16} />
                Log in
              </span>
            </button>
            <button
              type="button"
              onClick={() => {
                setIsSignup(true);
                setError('');
                setStatusMessage('');
                resetTwoFactor();
              }}
              className={`flex-1 py-2 rounded-xl text-sm font-semibold border transition ${
                isSignup ? 'bg-purple-600 text-white border-purple-600' : 'bg-white text-gray-600 border-gray-200 hover:border-purple-200'
              }`}
            >
              <span className="inline-flex items-center gap-2 justify-center">
                <UserPlus size={16} />
                Sign up
              </span>
            </button>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {isSignup && (
            <div>
              <label className="text-sm font-medium text-gray-700">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 bg-white/80"
                placeholder="Enter your name"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 bg-white/80"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 bg-white/80"
              placeholder="Enter your password"
              autoComplete={isSignup ? 'new-password' : 'current-password'}
            />
          </div>

          {isSignup && (
            <div>
              <label className="text-sm font-medium text-gray-700">Confirm password</label>
              <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 bg-white/80"
              placeholder="Re-enter your password"
              autoComplete="new-password"
            />
          </div>
          )}

          <div className="rounded-2xl border border-purple-100 bg-purple-50/60 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-purple-900">Passkey sign-in</p>
                <p className="text-xs text-purple-600">Use Touch ID, Face ID, or a security key instead of typing a password.</p>
              </div>
              <button
                type="button"
                onClick={handlePasskey}
                disabled={isSubmitting}
                className="px-3 py-2 rounded-lg bg-white text-purple-700 text-xs font-semibold border border-purple-200 hover:border-purple-300 transition"
              >
                Use passkey
              </button>
            </div>
            {passkeyNotice && (
              <p className="mt-2 text-xs text-purple-700">{passkeyNotice}</p>
            )}
          </div>

          <div className="rounded-2xl border border-gray-100 bg-gray-50/70 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-gray-900">Two-factor authentication</p>
                <p className="text-xs text-gray-500">Add a second step for secure logins.</p>
              </div>
              <select
                value={twoFactorMethod}
                onChange={(event) => setTwoFactorMethod(event.target.value)}
                className="text-xs font-semibold rounded-lg border border-gray-200 bg-white px-2 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-100"
                aria-label="Select two-factor authentication method"
              >
                <option value="authenticator">Authenticator app</option>
                <option value="sms">SMS code</option>
                <option value="email">Email code</option>
              </select>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              {isSignup
                ? `We'll enable ${twoFactorMethod.replace('-', ' ')} codes for this account.`
                : 'We will use your saved 2FA method after you sign in.'}
            </p>
          </div>

          {statusMessage && (
            <div className="text-sm text-purple-700 bg-purple-50 border border-purple-100 rounded-xl px-4 py-3">
              {statusMessage}
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-pink-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Working...' : isSignup ? 'Create account' : 'Continue'}
          </button>
        </form>

        {twoFactorChallengeId ? (
          <form className="mt-5 space-y-3" onSubmit={handleTwoFactorSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700">Two-factor code</label>
              <input
                type="text"
                value={twoFactorCode}
                onChange={(event) => setTwoFactorCode(event.target.value)}
                className="mt-2 w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100 bg-white/80"
                placeholder="Enter 6-digit code"
              />
              {twoFactorHint && (
                <p className="mt-2 text-xs text-gray-500">{twoFactorHint}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl border border-purple-200 bg-white text-purple-700 font-semibold shadow-sm hover:border-purple-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifying...' : 'Verify code'}
            </button>
          </form>
        ) : null}

        {isAdminMode ? (
          <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50/70 px-4 py-3 text-xs text-purple-700">
            Primary admin login: <span className="font-semibold text-purple-900">john@academystudios.com</span>
            <span className="block text-purple-600 mt-1">Demo password: AdminPass123! · 2FA code: 123456.</span>
            <span className="block text-purple-600 mt-1">Only the primary admin can grant staff access.</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

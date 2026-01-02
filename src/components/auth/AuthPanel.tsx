import { useState } from 'react';
import { LogIn, UserPlus, ShieldCheck, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminStore } from '../../store/adminStore';
import { useAuthStore } from '../../store/authStore';

type AuthMode = 'admin' | 'customer';

const generateId = () => (crypto.randomUUID ? crypto.randomUUID().split('-')[0] : Math.random().toString(36).substring(2, 9));

export function AuthPanel({ mode }: { mode: AuthMode }) {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { users, staff, addUser } = useAdminStore();
  const isAdminMode = mode === 'admin';

  const modeTitle = isAdminMode ? 'Admin Access' : 'Customer Portal';
  const modeDescription = isAdminMode
    ? 'Sign in with the primary admin account to manage the store.'
    : 'Log in or create an account to view your purchases and invoices.';

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedName = name.trim();

    if (!trimmedEmail) {
      setError('Please enter a valid email address.');
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

      addUser({
        name: trimmedName,
        email: trimmedEmail,
        status: 'active',
        role: 'customer',
        lastActive: 'Now',
      });
      login({ id: generateId(), name: trimmedName, email: trimmedEmail, role: 'customer' });
      navigate('/account');
      return;
    }

    if (isAdminMode) {
      const adminMatch = staff.find((member) => member.email.toLowerCase() === trimmedEmail && member.role === 'admin');
      if (!adminMatch) {
        setError('This email does not have admin access. Use the primary admin account.');
        return;
      }
      login({ id: adminMatch.id, name: adminMatch.name, email: adminMatch.email, role: adminMatch.role });
      navigate('/admin/panel');
      return;
    }

    const userMatch = users.find((user) => user.email.toLowerCase() === trimmedEmail);
    if (!userMatch) {
      setError('No customer account found. Please sign up to continue.');
      return;
    }
    login({ id: userMatch.id, name: userMatch.name, email: userMatch.email, role: userMatch.role });
    navigate('/account');
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
              onClick={() => { setIsSignup(false); setError(''); }}
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
              onClick={() => { setIsSignup(true); setError(''); }}
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

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg shadow-purple-500/25 hover:from-purple-700 hover:to-pink-600 transition"
          >
            {isSignup ? 'Create account' : 'Continue'}
          </button>
        </form>

        {isAdminMode ? (
          <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50/70 px-4 py-3 text-xs text-purple-700">
            Primary admin login: <span className="font-semibold text-purple-900">john@academystudios.com</span>
            <span className="block text-purple-600 mt-1">Only the primary admin can grant staff access.</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

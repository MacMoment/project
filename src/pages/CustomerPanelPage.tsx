import { Link } from 'react-router-dom';
import { FileText, ShoppingBag, LogOut, ShieldCheck } from 'lucide-react';
import { AuthPanel } from '../components/auth/AuthPanel';
import { useAdminStore } from '../store/adminStore';
import { useAuthStore } from '../store/authStore';

const formatCurrency = (amount: number) => `$${amount.toFixed(2)}`;

export default function CustomerPanelPage() {
  const { user, logout } = useAuthStore();
  const { purchases, invoices } = useAdminStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-16 flex justify-center">
        <AuthPanel mode="customer" />
      </div>
    );
  }

  const userPurchases = purchases.filter((purchase) => purchase.customerEmail === user.email);
  const userInvoices = invoices.filter((invoice) => invoice.customerEmail === user.email);

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Customer Panel</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user.name}. Manage your purchases and invoices.</p>
          </div>
          <div className="flex items-center gap-3">
            {user.role === 'admin' && (
              <Link
                to="/admin/panel"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-purple-200 text-purple-700 bg-white hover:bg-purple-50 transition"
              >
                <ShieldCheck size={16} />
                Admin Panel
              </Link>
            )}
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 transition"
            >
              <LogOut size={16} />
              Log out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                  <ShoppingBag size={18} />
                  Purchases
                </div>
                <span className="text-sm text-gray-500">{userPurchases.length} total</span>
              </div>
              {userPurchases.length === 0 ? (
                <p className="text-sm text-gray-500">No purchases yet. Start exploring the store.</p>
              ) : (
                <div className="space-y-4">
                  {userPurchases.map((purchase) => (
                    <div key={purchase.id} className="p-4 border border-gray-100 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{purchase.productName}</p>
                          <p className="text-sm text-gray-500">Purchased on {purchase.purchasedAt}</p>
                        </div>
                        <span className="font-semibold text-gray-900">{formatCurrency(purchase.amount)}</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-xs text-gray-500 mt-3">
                        <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 uppercase">{purchase.status}</span>
                        <span>
                          {purchase.paymentMethod.brand} •••• {purchase.paymentMethod.last4} (exp {purchase.paymentMethod.expMonth}/{purchase.paymentMethod.expYear})
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2 text-gray-900 font-semibold">
                  <FileText size={18} />
                  Invoices
                </div>
                <span className="text-sm text-gray-500">{userInvoices.length} open</span>
              </div>
              {userInvoices.length === 0 ? (
                <p className="text-sm text-gray-500">No invoices available.</p>
              ) : (
                <div className="space-y-4">
                  {userInvoices.map((invoice) => (
                    <div key={invoice.id} className="p-4 border border-gray-100 rounded-xl">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">{invoice.id}</p>
                          <p className="text-sm text-gray-500">Issued {invoice.issuedAt} • Due {invoice.dueAt}</p>
                        </div>
                        <span className="font-semibold text-gray-900">{formatCurrency(invoice.total)}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {invoice.items.map((item, index) => (
                          <span key={index} className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                            {item.description}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-gray-500 uppercase">Status: {invoice.status}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="font-semibold text-gray-900 mb-4">Account details</h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div>
                  <span className="block text-xs uppercase text-gray-400">Name</span>
                  {user.name}
                </div>
                <div>
                  <span className="block text-xs uppercase text-gray-400">Email</span>
                  {user.email}
                </div>
                <div>
                  <span className="block text-xs uppercase text-gray-400">Role</span>
                  {user.role}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold mb-2">Need help?</h3>
              <p className="text-sm text-purple-100 mb-4">
                Reach out to our support team for billing or purchase questions.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 text-sm font-semibold transition"
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

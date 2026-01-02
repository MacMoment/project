import { useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  TrendingUp,
  Settings,
  BarChart3,
  DollarSign,
  Download,
  RefreshCw,
  Bell,
  Search,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ClipboardList,
  CheckSquare,
  Megaphone,
  Zap,
  Globe,
  Shield,
  ShieldAlert,
  FileText,
  Tag,
  Image,
  Plus,
  Edit,
  Trash2,
  X,
  GripVertical,
  UserCog,
  Save,
  CreditCard,
} from 'lucide-react';
import { AuthPanel } from '../components/auth/AuthPanel';
import { useAdminStore, type User, type Staff, type Invoice } from '../store/adminStore';
import { useAuthStore } from '../store/authStore';
import type { Product, Category, PortfolioItem } from '../types';

type TabType =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'portfolio'
  | 'orders'
  | 'analytics'
  | 'users'
  | 'staff'
  | 'billing'
  | 'operations'
  | 'settings';

// Modal types
type ModalType = 'product' | 'category' | 'portfolio' | 'user' | 'staff' | 'invoice' | null;

const formatCurrency = (amount: number, currencyCode = 'USD') =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: currencyCode }).format(amount);

const parseDate = (value: string) => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? 0 : parsed;
};

const formatDateLabel = (value: string) => {
  const parsed = parseDate(value);
  if (!parsed) return value;
  return new Date(parsed).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const buildPercentageChange = (current: number, previous: number) => {
  if (previous === 0) {
    if (current === 0) {
      return { change: '0%', trend: 'up' as const };
    }
    return { change: '+100%', trend: 'up' as const };
  }
  const delta = ((current - previous) / previous) * 100;
  const rounded = Math.abs(delta).toFixed(1);
  return {
    change: `${delta >= 0 ? '+' : '-'}${rounded}%`,
    trend: delta >= 0 ? 'up' : 'down',
  };
};

const downloadFile = (filename: string, content: string, type = 'text/plain') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  const [editingItem, setEditingItem] = useState<Product | Category | PortfolioItem | User | Staff | Invoice | null>(null);
  const [staffSeed, setStaffSeed] = useState<Pick<Staff, 'name' | 'email'> | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [revenueRange, setRevenueRange] = useState('7');
  const [storeName, setStoreName] = useState('Academy Studios');
  const [contactEmail, setContactEmail] = useState('hello@academystudios.com');
  const [currency, setCurrency] = useState('USD');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginNotificationsEnabled, setLoginNotificationsEnabled] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('30 minutes');
  const [integrations, setIntegrations] = useState([
    { name: 'Stripe', description: 'Payment processing', connected: true },
    { name: 'Discord', description: 'Community notifications', connected: true },
    { name: 'Google Analytics', description: 'Website analytics', connected: false },
  ]);
  const [invoiceForm, setInvoiceForm] = useState({
    customerName: '',
    customerEmail: '',
    issuedAt: '',
    dueAt: '',
    status: 'draft' as Invoice['status'],
    items: [{ description: '', amount: 0 }],
  });
  const [approvalQueue, setApprovalQueue] = useState([
    {
      id: 'REQ-204',
      title: 'Refund request: Hosting Bundle',
      requester: 'Elena West',
      type: 'Refund',
      priority: 'High',
      status: 'pending',
    },
    {
      id: 'REQ-207',
      title: 'New vendor payout',
      requester: 'Marcus Lee',
      type: 'Finance',
      priority: 'Medium',
      status: 'review',
    },
    {
      id: 'REQ-213',
      title: 'Portfolio feature request',
      requester: 'Talia Nguyen',
      type: 'Content',
      priority: 'Low',
      status: 'approved',
    },
  ]);
  const [maintenanceTasks, setMaintenanceTasks] = useState([
    { id: 'task-1', title: 'Rotate API keys', owner: 'Security', due: 'Aug 18', completed: false },
    { id: 'task-2', title: 'QA upcoming release', owner: 'Product', due: 'Aug 21', completed: false },
    { id: 'task-3', title: 'Archive inactive subscriptions', owner: 'Billing', due: 'Aug 24', completed: true },
  ]);
  const [broadcastDraft, setBroadcastDraft] = useState({
    title: '',
    audience: 'All customers',
    message: '',
  });
  const [broadcasts, setBroadcasts] = useState([
    { id: 'ANN-12', title: 'August maintenance window', audience: 'All customers', sentAt: 'Aug 10, 9:00 AM' },
    { id: 'ANN-13', title: 'New analytics dashboard', audience: 'Pro customers', sentAt: 'Aug 12, 4:30 PM' },
  ]);

  const { user } = useAuthStore();
  
  // Admin store
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
    portfolioItems,
    addPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
    reorderPortfolio,
    users,
    addUser,
    updateUser,
    deleteUser,
    staff,
    addStaff,
    updateStaff,
    deleteStaff,
    purchases,
    invoices,
    addInvoice,
  } = useAdminStore();

  const formatCurrencyValue = (amount: number) => formatCurrency(amount, currency);

  const productLookup = useMemo(() => {
    return new Map(products.map((product) => [product.name, product]));
  }, [products]);

  const totalRevenue = useMemo(
    () => purchases.filter((purchase) => purchase.status === 'completed').reduce((sum, purchase) => sum + purchase.amount, 0),
    [purchases]
  );

  const totalOrders = purchases.length;
  const activeUsers = users.filter((entry) => entry.status === 'active').length;
  const conversionRate = users.length ? (totalOrders / users.length) * 100 : 0;

  const stats = useMemo(() => {
    const now = Date.now();
    const rangeMs = 7 * 24 * 60 * 60 * 1000;
    const currentStart = now - rangeMs;
    const previousStart = currentStart - rangeMs;

    const currentPurchases = purchases.filter((purchase) => parseDate(purchase.purchasedAt) >= currentStart);
    const previousPurchases = purchases.filter((purchase) => {
      const timestamp = parseDate(purchase.purchasedAt);
      return timestamp >= previousStart && timestamp < currentStart;
    });
    const currentRevenue = currentPurchases
      .filter((purchase) => purchase.status === 'completed')
      .reduce((sum, purchase) => sum + purchase.amount, 0);
    const previousRevenue = previousPurchases
      .filter((purchase) => purchase.status === 'completed')
      .reduce((sum, purchase) => sum + purchase.amount, 0);

    const currentOrders = currentPurchases.length;
    const previousOrders = previousPurchases.length;

    const currentUsers = users.filter((entry) => parseDate(entry.createdAt) >= currentStart).length;
    const previousUsers = users.filter((entry) => {
      const timestamp = parseDate(entry.createdAt);
      return timestamp >= previousStart && timestamp < currentStart;
    }).length;

    const currentConversion = users.length ? (currentOrders / users.length) * 100 : 0;
    const previousConversion = users.length ? (previousOrders / users.length) * 100 : 0;

    const revenueChange = buildPercentageChange(currentRevenue, previousRevenue);
    const ordersChange = buildPercentageChange(currentOrders, previousOrders);
    const usersChange = buildPercentageChange(currentUsers, previousUsers);
    const conversionChange = buildPercentageChange(currentConversion, previousConversion);

    return [
      {
        label: 'Total Revenue',
        value: formatCurrencyValue(totalRevenue),
        ...revenueChange,
        icon: DollarSign,
        color: 'from-green-500 to-emerald-600',
      },
      {
        label: 'Total Orders',
        value: totalOrders.toLocaleString(),
        ...ordersChange,
        icon: ShoppingCart,
        color: 'from-blue-500 to-indigo-600',
      },
      {
        label: 'Active Users',
        value: activeUsers.toLocaleString(),
        ...usersChange,
        icon: Users,
        color: 'from-purple-500 to-pink-600',
      },
      {
        label: 'Conversion Rate',
        value: `${conversionRate.toFixed(2)}%`,
        ...conversionChange,
        icon: TrendingUp,
        color: 'from-orange-500 to-red-600',
      },
    ];
  }, [activeUsers, conversionRate, currency, purchases, totalOrders, totalRevenue, users]);

  const sortedPurchases = useMemo(
    () => [...purchases].sort((a, b) => parseDate(b.purchasedAt) - parseDate(a.purchasedAt)),
    [purchases]
  );

  const recentOrders = sortedPurchases.slice(0, 5);

  const userActivity = useMemo(() => {
    const purchaseActivity = purchases.map((purchase) => ({
      type: 'purchase',
      user: purchase.customerName,
      email: purchase.customerEmail,
      action: `Purchased ${purchase.productName}`,
      time: formatDateLabel(purchase.purchasedAt),
      timestamp: parseDate(purchase.purchasedAt),
    }));

    const signupActivity = users.map((entry) => ({
      type: 'signup',
      user: entry.name,
      email: entry.email,
      action: 'Registered new account',
      time: formatDateLabel(entry.createdAt),
      timestamp: parseDate(entry.createdAt),
    }));

    return [...purchaseActivity, ...signupActivity]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 6);
  }, [purchases, users]);

  const topProducts = useMemo(() => {
    const salesCount: Record<string, number> = {};
    purchases
      .filter((purchase) => purchase.status === 'completed')
      .forEach((purchase) => {
        const product = productLookup.get(purchase.productName);
        if (!product) return;
        salesCount[product.id] = (salesCount[product.id] || 0) + 1;
      });

    return [...products]
      .map((product) => ({ ...product, sales: salesCount[product.id] || 0 }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 4);
  }, [productLookup, products, purchases]);

  const categoryBreakdown = useMemo(() => {
    const totals: Record<string, number> = {};
    purchases.forEach((purchase) => {
      const product = productLookup.get(purchase.productName);
      const category = product?.category || 'uncategorized';
      totals[category] = (totals[category] || 0) + 1;
    });
    const totalPurchases = purchases.length;
    const categoryColors = ['bg-purple-500', 'bg-blue-500', 'bg-pink-500', 'bg-orange-500', 'bg-emerald-500'];
    return categories
      .filter((category) => category.slug !== 'all')
      .map((category, index) => ({
        source: category.name,
        count: totals[category.slug] || 0,
        percentage: totalPurchases ? Math.round(((totals[category.slug] || 0) / totalPurchases) * 100) : 0,
        color: categoryColors[index % categoryColors.length],
      }));
  }, [categories, productLookup, purchases]);

  const customerStatusCards = useMemo(() => {
    const activeCount = users.filter((entry) => entry.status === 'active').length;
    const inactiveCount = users.filter((entry) => entry.status === 'inactive').length;
    const suspendedCount = users.filter((entry) => entry.status === 'suspended').length;
    return [
      { label: 'Active', value: activeCount, color: 'text-purple-600', background: 'bg-purple-50' },
      { label: 'Inactive', value: inactiveCount, color: 'text-gray-600', background: 'bg-gray-50' },
      { label: 'Suspended', value: suspendedCount, color: 'text-red-600', background: 'bg-red-50' },
      { label: 'Total', value: users.length, color: 'text-blue-600', background: 'bg-blue-50' },
    ];
  }, [users]);

  const revenueSeries = useMemo(() => {
    const rangeDays = revenueRange === '30' ? 30 : revenueRange === '90' ? 90 : 7;
    const bucketSize = Math.ceil(rangeDays / 7);
    const rangeEnd = new Date();
    const rangeStart = new Date(rangeEnd);
    rangeStart.setDate(rangeEnd.getDate() - (rangeDays - 1));

    const buckets = Array.from({ length: 7 }, (_, index) => {
      const start = new Date(rangeStart);
      start.setDate(rangeStart.getDate() + index * bucketSize);
      const end = new Date(start);
      end.setDate(start.getDate() + bucketSize);
      return { start, end };
    });

    const totals = buckets.map(({ start, end }) =>
      purchases
        .filter((purchase) => {
          const timestamp = parseDate(purchase.purchasedAt);
          return timestamp >= start.getTime() && timestamp < end.getTime();
        })
        .filter((purchase) => purchase.status === 'completed')
        .reduce((sum, purchase) => sum + purchase.amount, 0)
    );

    const maxValue = Math.max(...totals, 1);
    const labels = buckets.map(({ start }) =>
      start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );

    return {
      values: totals.map((total) => (total / maxValue) * 100),
      totals,
      labels,
    };
  }, [purchases, revenueRange]);

  const storePulse = useMemo(() => {
    return [
      {
        name: 'Catalog',
        status: products.length ? 'operational' : 'pending',
        uptime: `${products.length} products`,
      },
      {
        name: 'Portfolio',
        status: portfolioItems.length ? 'operational' : 'pending',
        uptime: `${portfolioItems.length} items`,
      },
      {
        name: 'Categories',
        status: categories.length ? 'operational' : 'pending',
        uptime: `${categories.length} categories`,
      },
      {
        name: 'Staff Coverage',
        status: staff.length ? 'operational' : 'pending',
        uptime: `${staff.length} staff`,
      },
    ];
  }, [categories.length, portfolioItems.length, products.length, staff.length]);

  const securityAlerts = useMemo(
    () => [
      { id: 'alert-1', title: 'Multiple failed logins blocked', time: '12 minutes ago', status: 'review' },
      { id: 'alert-2', title: 'New admin API key issued', time: '1 hour ago', status: 'approved' },
      { id: 'alert-3', title: 'Suspicious IP flagged for review', time: 'Yesterday', status: 'pending' },
    ],
    []
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-purple-50 pt-24 pb-16 flex justify-center">
        <AuthPanel mode="admin" />
      </div>
    );
  }

  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-purple-50 pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 mx-auto flex items-center justify-center mb-4 shadow-inner">
              <Shield size={24} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin access required</h1>
            <p className="text-gray-500 mt-2">
              Your account does not have admin permissions. Switch to an admin account to continue.
            </p>
            <div className="mt-6">
              <a
                href="/account"
                className="inline-flex items-center justify-center px-4 py-2 rounded-xl border border-purple-200 text-purple-700 bg-white hover:bg-purple-50 transition"
              >
                Go to customer panel
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const hasSearch = normalizedQuery.length > 0;
  const matchesQuery = (value: string) => value.toLowerCase().includes(normalizedQuery);

  const filteredProducts = useMemo(() => {
    if (!hasSearch) return products;
    return products.filter((product) =>
      [
        product.name,
        product.description,
        product.category,
        product.tags.join(' '),
        product.price.toString(),
      ].some(matchesQuery)
    );
  }, [hasSearch, normalizedQuery, products]);

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.order - b.order),
    [categories]
  );

  const filteredCategories = useMemo(() => {
    if (!hasSearch) return sortedCategories;
    return sortedCategories.filter((category) =>
      [category.name, category.slug].some(matchesQuery)
    );
  }, [hasSearch, normalizedQuery, sortedCategories]);

  const filteredPortfolio = useMemo(() => {
    if (!hasSearch) return portfolioItems;
    return portfolioItems.filter((item) =>
      [item.title, item.description, item.category].some(matchesQuery)
    );
  }, [hasSearch, normalizedQuery, portfolioItems]);

  const filteredUsers = useMemo(() => {
    if (!hasSearch) return users;
    return users.filter((user) =>
      [user.name, user.email, user.status].some(matchesQuery)
    );
  }, [hasSearch, normalizedQuery, users]);

  const filteredStaff = useMemo(() => {
    if (!hasSearch) return staff;
    return staff.filter((member) =>
      [member.name, member.email, member.role, member.status].some(matchesQuery)
    );
  }, [hasSearch, normalizedQuery, staff]);

  const staffEmails = useMemo(
    () => new Set(staff.map((member) => member.email.toLowerCase())),
    [staff]
  );

  const filteredOrders = useMemo(() => {
    if (!hasSearch) return sortedPurchases;
    return sortedPurchases.filter((order) =>
      [
        order.id,
        order.customerName,
        order.productName,
        order.status,
        order.amount.toString(),
      ].some(matchesQuery)
    );
  }, [hasSearch, matchesQuery, sortedPurchases]);

  const filteredPurchases = useMemo(() => {
    if (!hasSearch) return purchases;
    return purchases.filter((purchase) =>
      [
        purchase.id,
        purchase.customerName,
        purchase.customerEmail,
        purchase.productName,
        purchase.status,
        purchase.amount.toString(),
        purchase.paymentMethod.brand,
        purchase.paymentMethod.last4,
      ].some(matchesQuery)
    );
  }, [hasSearch, normalizedQuery, purchases]);

  const filteredInvoices = useMemo(() => {
    if (!hasSearch) return invoices;
    return invoices.filter((invoice) =>
      [
        invoice.id,
        invoice.customerName,
        invoice.customerEmail,
        invoice.status,
        invoice.total.toString(),
      ].some(matchesQuery)
    );
  }, [hasSearch, normalizedQuery, invoices]);

  const filteredApprovalQueue = useMemo(() => {
    if (!hasSearch) return approvalQueue;
    return approvalQueue.filter((request) =>
      [
        request.id,
        request.title,
        request.requester,
        request.type,
        request.priority,
        request.status,
      ].some(matchesQuery)
    );
  }, [approvalQueue, hasSearch, matchesQuery]);

  const filteredMaintenanceTasks = useMemo(() => {
    if (!hasSearch) return maintenanceTasks;
    return maintenanceTasks.filter((task) =>
      [task.title, task.owner, task.due].some(matchesQuery)
    );
  }, [hasSearch, maintenanceTasks, matchesQuery]);

  const filteredBroadcasts = useMemo(() => {
    if (!hasSearch) return broadcasts;
    return broadcasts.filter((announcement) =>
      [announcement.title, announcement.audience, announcement.sentAt].some(matchesQuery)
    );
  }, [broadcasts, hasSearch, matchesQuery]);

  const allowReorder = !hasSearch;

  const searchPlaceholder = useMemo(() => {
    switch (activeTab) {
      case 'products':
        return 'Search products...';
      case 'categories':
        return 'Search categories...';
      case 'portfolio':
        return 'Search portfolio...';
      case 'orders':
        return 'Search orders...';
      case 'users':
        return 'Search users...';
      case 'staff':
        return 'Search staff...';
      case 'billing':
        return 'Search purchases and invoices...';
      case 'operations':
        return 'Search approvals and tasks...';
      default:
        return 'Search...';
    }
  }, [activeTab]);
  const sidebarItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products' as TabType, label: 'Products', icon: Package },
    { id: 'categories' as TabType, label: 'Categories', icon: Tag },
    { id: 'portfolio' as TabType, label: 'Portfolio', icon: Image },
    { id: 'orders' as TabType, label: 'Orders', icon: ShoppingCart },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'users' as TabType, label: 'Users', icon: Users },
    { id: 'staff' as TabType, label: 'Staff', icon: UserCog },
    { id: 'billing' as TabType, label: 'Billing', icon: CreditCard },
    { id: 'operations' as TabType, label: 'Operations', icon: ClipboardList },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  // Consolidated status configuration
  const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
    completed: { color: 'text-green-600 bg-green-50', icon: CheckCircle },
    operational: { color: 'text-green-600 bg-green-50', icon: CheckCircle },
    approved: { color: 'text-green-600 bg-green-50', icon: CheckCircle },
    processing: { color: 'text-blue-600 bg-blue-50', icon: RefreshCw },
    review: { color: 'text-blue-600 bg-blue-50', icon: RefreshCw },
    pending: { color: 'text-yellow-600 bg-yellow-50', icon: AlertCircle },
    degraded: { color: 'text-yellow-600 bg-yellow-50', icon: AlertCircle },
    failed: { color: 'text-red-600 bg-red-50', icon: XCircle },
    rejected: { color: 'text-red-600 bg-red-50', icon: XCircle },
  };

  const defaultStatusConfig = { color: 'text-gray-600 bg-gray-50', icon: Clock };

  const getStatusColor = (status: string) => {
    return (statusConfig[status] || defaultStatusConfig).color;
  };

  const getStatusIcon = (status: string) => {
    return (statusConfig[status] || defaultStatusConfig).icon;
  };

  const handleExportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      storeName,
      contactEmail,
      currency,
      products,
      categories,
      portfolioItems,
      users,
      staff,
      purchases,
      invoices,
    };
    downloadFile('admin-export.json', JSON.stringify(payload, null, 2), 'application/json');
  };

  const handleGenerateReport = () => {
    const report = [
      `Store Report - ${storeName}`,
      `Generated: ${new Date().toLocaleString()}`,
      '',
      `Total Revenue: ${formatCurrencyValue(totalRevenue)}`,
      `Total Orders: ${totalOrders}`,
      `Active Users: ${activeUsers}`,
      `Conversion Rate: ${conversionRate.toFixed(2)}%`,
      '',
      `Top Products:`,
      ...topProducts.map((product) => `- ${product.name}: ${product.sales} sales`),
    ].join('\n');
    downloadFile('store-report.txt', report);
  };

  const canSendBroadcast = broadcastDraft.title.trim().length > 0 && broadcastDraft.message.trim().length > 0;

  const handleSendBroadcast = () => {
    if (!canSendBroadcast) return;
    const timestamp = new Date();
    const formattedTime = timestamp.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });

    setBroadcasts((prev) => [
      {
        id: `ANN-${timestamp.getTime()}`,
        title: broadcastDraft.title.trim(),
        audience: broadcastDraft.audience,
        sentAt: formattedTime,
      },
      ...prev,
    ]);
    setBroadcastDraft({ title: '', audience: broadcastDraft.audience, message: '' });
  };

  const handleRefresh = () => {
    setLastRefresh(new Date());
    setSearchQuery('');
    setShowNotifications(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-16 lg:flex-row lg:items-start">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:self-start">
          <div className="flex h-full flex-col rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 flex items-center justify-center">
                  <Shield size={20} className="text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Admin Panel</h2>
                  <p className="text-xs text-gray-500">v2.0 Advanced</p>
                </div>
              </div>

              <nav className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="mt-auto p-6 pt-0">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
                <div className="flex items-center gap-2 text-purple-700 font-semibold mb-2">
                  <Zap size={16} />
                  Quick Actions
                </div>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={handleGenerateReport}
                    className="w-full text-left text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2 py-1"
                  >
                    <FileText size={14} />
                    Generate Report
                  </button>
                  <button
                    type="button"
                    onClick={handleExportData}
                    className="w-full text-left text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2 py-1"
                  >
                    <Download size={14} />
                    Export Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
              <p className="text-gray-500 text-sm mt-1">
                {activeTab === 'dashboard' && 'Welcome back! Here\'s what\'s happening with your store.'}
                {activeTab === 'products' && 'Manage your product catalog and inventory.'}
                {activeTab === 'orders' && 'Track and manage customer orders.'}
                {activeTab === 'analytics' && 'Detailed insights into your store performance.'}
                {activeTab === 'users' && 'Manage user accounts and permissions.'}
                {activeTab === 'billing' && 'Create invoices and review customer purchase activity.'}
                {activeTab === 'operations' && 'Handle approvals, maintenance, and broadcast updates.'}
                {activeTab === 'settings' && 'Configure your store settings and preferences.'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm w-64 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                />
                {hasSearch && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                    title="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="text-xs text-gray-400">
                Last updated {lastRefresh.toLocaleTimeString()}
              </div>

              {activeTab === 'billing' && (
                <button
                  type="button"
                  onClick={() => {
                    setInvoiceForm({
                      customerName: '',
                      customerEmail: '',
                      issuedAt: '',
                      dueAt: '',
                      status: 'draft',
                      items: [{ description: '', amount: 0 }],
                    });
                    setEditingItem(null);
                    setModalOpen('invoice');
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:bg-purple-700 transition"
                >
                  <Plus size={16} />
                  New invoice
                </button>
              )}

              {/* Notifications */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className="relative p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                  aria-label="Toggle notifications"
                >
                  <Bell size={20} className="text-gray-600" />
                  {userActivity.length > 0 && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                  )}
                </button>
                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl p-4 z-20">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold text-gray-900">Recent activity</p>
                      <button
                        type="button"
                        onClick={() => setShowNotifications(false)}
                        className="text-xs text-gray-400 hover:text-gray-600"
                      >
                        Close
                      </button>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {userActivity.slice(0, 4).map((activity, index) => (
                        <div key={`${activity.type}-${index}`} className="text-xs text-gray-600">
                          <span className="font-semibold text-gray-900">{activity.user}</span> {activity.action}
                          <div className="text-[11px] text-gray-400">{activity.time}</div>
                        </div>
                      ))}
                      {userActivity.length === 0 && (
                        <div className="text-xs text-gray-400">No new activity yet.</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Refresh */}
              <button
                type="button"
                onClick={handleRefresh}
                className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                aria-label="Refresh dashboard"
              >
                <RefreshCw size={20} className="text-gray-600" />
              </button>
            </div>
          </div>

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                        <stat.icon size={24} className="text-white" />
                      </div>
                      <span className={`flex items-center gap-1 text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-gray-500 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Revenue Overview</h3>
                    <select
                      value={revenueRange}
                      onChange={(event) => setRevenueRange(event.target.value)}
                      className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-400"
                    >
                      <option value="7">Last 7 days</option>
                      <option value="30">Last 30 days</option>
                      <option value="90">Last 90 days</option>
                    </select>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {revenueSeries.values.map((height, i) => (
                      <div key={revenueSeries.labels[i]} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all hover:from-purple-500 hover:to-purple-300"
                          style={{ height: `${height}%` }}
                          title={formatCurrencyValue(revenueSeries.totals[i])}
                        ></div>
                        <span className="text-xs text-gray-500">{revenueSeries.labels[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Store Pulse */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Store Pulse</h3>
                    <Activity size={20} className="text-green-500" />
                  </div>
                  <div className="space-y-4">
                    {storePulse.map((system, index) => {
                      const StatusIcon = getStatusIcon(system.status);
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(system.status)}`}>
                              <StatusIcon size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{system.name}</p>
                              <p className="text-xs text-gray-500">{system.uptime}</p>
                            </div>
                          </div>
                          <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(system.status)}`}>
                            {system.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Recent Activity Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Recent Orders</h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('orders')}
                      className="text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center gap-1"
                    >
                      View All <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.length === 0 ? (
                      <div className="text-sm text-gray-500">No orders yet.</div>
                    ) : (
                      recentOrders.map((order) => {
                        const StatusIcon = getStatusIcon(order.status);
                        return (
                          <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getStatusColor(order.status)}`}>
                                <StatusIcon size={18} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{order.customerName}</p>
                                <p className="text-xs text-gray-500">{order.productName}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-gray-900">{formatCurrencyValue(order.amount)}</p>
                              <p className="text-xs text-gray-500">{formatDateLabel(order.purchasedAt)}</p>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* User Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">User Activity</h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('users')}
                      className="text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center gap-1"
                    >
                      View All <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {userActivity.map((activity, index) => (
                      <div key={`${activity.type}-${index}`} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold text-sm">
                          {activity.user.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">
                            <span className="font-medium text-gray-900">{activity.user}</span>
                            <span className="text-gray-500"> {activity.action}</span>
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Actions Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => { setEditingItem(null); setModalOpen('product'); }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl transition-shadow"
                  >
                    <Plus size={18} />
                    Add Product
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Showing {filteredProducts.length}{hasSearch && ` of ${products.length}`} products
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tags</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="text-right py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 px-6 text-center text-gray-500">
                          {hasSearch ? 'No products match your search.' : 'No products available.'}
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <img
                                src={product.image}
                                alt={product.name}
                                loading="lazy"
                                decoding="async"
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div>
                                <p className="font-medium text-gray-900">{product.name}</p>
                                <p className="text-xs text-gray-500 truncate max-w-xs">{product.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium capitalize">
                              {product.category}
                            </span>
                          </td>
                          <td className="py-4 px-6 font-semibold text-gray-900">${product.price}</td>
                          <td className="py-4 px-6">
                            <div className="flex flex-wrap gap-1">
                              {product.tags.slice(0, 2).map((tag) => (
                                <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                  {tag}
                                </span>
                              ))}
                              {product.tags.length > 2 && (
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                                  +{product.tags.length - 2}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm text-gray-900">{product.rating}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center justify-end gap-2">
                              <button 
                                onClick={() => { setEditingItem(product); setModalOpen('product'); }}
                                className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => { if (confirm('Delete this product?')) deleteProduct(product.id); }}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                title="Delete"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Order Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <ShoppingCart size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{purchases.length}</p>
                      <p className="text-xs text-gray-500">Total Orders</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center">
                      <Clock size={20} className="text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {purchases.filter((purchase) => purchase.status === 'pending').length}
                      </p>
                      <p className="text-xs text-gray-500">Pending</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {purchases.filter((purchase) => purchase.status === 'completed').length}
                      </p>
                      <p className="text-xs text-gray-500">Completed</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                      <XCircle size={20} className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {purchases.filter((purchase) => purchase.status === 'failed').length}
                      </p>
                      <p className="text-xs text-gray-500">Failed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">All Orders</h3>
                  <span className="text-sm text-gray-500">
                    Showing {filteredOrders.length}{hasSearch && ` of ${sortedPurchases.length}`} orders
                  </span>
                </div>
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-10 px-6 text-center text-gray-500">
                          {hasSearch ? 'No orders match your search.' : 'No orders available.'}
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 font-mono text-sm text-purple-600">{order.id}</td>
                          <td className="py-4 px-6 font-medium text-gray-900">{order.customerName}</td>
                          <td className="py-4 px-6 text-gray-600">{order.productName}</td>
                          <td className="py-4 px-6 font-semibold text-gray-900">{formatCurrencyValue(order.amount)}</td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-500 text-sm">{formatDateLabel(order.purchasedAt)}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Breakdown */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-6">Category Breakdown</h3>
                  <div className="space-y-4">
                    {categoryBreakdown.map((item) => (
                      <div key={item.source}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">{item.source}</span>
                          <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${item.color} rounded-full transition-all`}
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                    {categoryBreakdown.length === 0 && (
                      <div className="text-sm text-gray-500">No category data available yet.</div>
                    )}
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-6">Top Selling Products</h3>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center gap-4">
                        <span className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sales} sales</p>
                        </div>
                        <span className="font-semibold text-gray-900">{formatCurrencyValue(product.price)}</span>
                      </div>
                    ))}
                    {topProducts.length === 0 && (
                      <div className="text-sm text-gray-500">No sales recorded yet.</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Customer Status</h3>
                  <Globe size={20} className="text-gray-400" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {customerStatusCards.map((item) => (
                    <div key={item.label} className={`p-4 ${item.background} rounded-xl`}>
                      <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
                      <p className="text-sm text-gray-600">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">User Account Management</h3>
                  <button 
                    onClick={() => { setEditingItem(null); setModalOpen('user'); }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium text-sm"
                  >
                    <Plus size={16} />
                    Add User
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Showing {filteredUsers.length}{hasSearch && ` of ${users.length}`} users
                </p>
                <div className="space-y-4">
                  {filteredUsers.length === 0 ? (
                    <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-xl">
                      {hasSearch ? 'No users match your search.' : 'No users available.'}
                    </div>
                  ) : (
                    filteredUsers.map((user) => {
                      const isStaffMember = staffEmails.has(user.email.toLowerCase());
                      return (
                        <div
                          key={user.id}
                          className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-md">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-500">{user.email}</p>
                              <p className="text-xs text-gray-400">Last active: {user.lastActive}</p>
                            </div>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600">
                              customer
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === 'active' ? 'bg-green-50 text-green-600' :
                              user.status === 'inactive' ? 'bg-gray-100 text-gray-600' :
                              'bg-red-50 text-red-600'
                            }`}>
                              {user.status}
                            </span>
                            <button
                              type="button"
                              title={isStaffMember ? 'Already a staff member' : 'Promote to staff'}
                              onClick={() => {
                                if (isStaffMember) return;
                                setStaffSeed({ name: user.name, email: user.email });
                                setEditingItem(null);
                                setModalOpen('staff');
                              }}
                              className={`p-2 rounded-lg transition-colors ${
                                isStaffMember
                                  ? 'text-gray-300 cursor-not-allowed'
                                  : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                              }`}
                              disabled={isStaffMember}
                            >
                              <UserCog size={18} />
                            </button>
                            <button 
                              onClick={() => { setEditingItem(user); setModalOpen('user'); }}
                              className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => { if (confirm('Delete this user?')) deleteUser(user.id); }}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Staff Tab */}
          {activeTab === 'staff' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Staff Account Management</h3>
                  <button 
                    onClick={() => { setEditingItem(null); setStaffSeed(null); setModalOpen('staff'); }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium text-sm"
                  >
                    <Plus size={16} />
                    Add Staff
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Showing {filteredStaff.length}{hasSearch && ` of ${staff.length}`} staff members
                </p>
                <div className="space-y-4">
                  {filteredStaff.length === 0 ? (
                    <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-xl">
                      {hasSearch ? 'No staff match your search.' : 'No staff members available.'}
                    </div>
                  ) : (
                    filteredStaff.map((member) => (
                      <div
                        key={member.id}
                        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <p className="text-sm text-gray-500">{member.email}</p>
                            <p className="text-xs text-gray-400">Last active: {member.lastActive}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                            member.role === 'admin' ? 'bg-purple-50 text-purple-600' :
                            member.role === 'moderator' ? 'bg-blue-50 text-blue-600' :
                            'bg-green-50 text-green-600'
                          }`}>
                            {member.role}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            member.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {member.status}
                          </span>
                          <button 
                            onClick={() => { setEditingItem(member); setStaffSeed(null); setModalOpen('staff'); }}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => { if (confirm('Delete this staff member?')) deleteStaff(member.id); }}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                      <FileText size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Invoices</p>
                      <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                      <CreditCard size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Completed Purchases</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {purchases.filter((purchase) => purchase.status === 'completed').length}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                      <DollarSign size={18} className="text-orange-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Invoice Balance</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrencyValue(invoices.reduce((total, invoice) => total + invoice.total, 0))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Customer Purchases</h3>
                      <p className="text-sm text-gray-500">Card details are masked for security.</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      Showing {filteredPurchases.length}{hasSearch && ` of ${purchases.length}`} purchases
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {filteredPurchases.length === 0 ? (
                      <div className="py-10 text-center text-gray-500">
                        {hasSearch ? 'No purchases match your search.' : 'No purchases available.'}
                      </div>
                    ) : (
                      filteredPurchases.map((purchase) => (
                        <div key={purchase.id} className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{purchase.productName}</p>
                              <p className="text-xs text-gray-500">{purchase.customerName} • {purchase.customerEmail}</p>
                              <p className="text-xs text-gray-400 mt-1">Purchased {purchase.purchasedAt}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-gray-900">{formatCurrencyValue(purchase.amount)}</p>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(purchase.status)}`}>
                                {purchase.status}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 text-xs text-gray-500">
                            {purchase.paymentMethod.brand} •••• {purchase.paymentMethod.last4} • Exp {purchase.paymentMethod.expMonth}/{purchase.paymentMethod.expYear}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">Invoices</h3>
                      <p className="text-sm text-gray-500">Track invoice status and totals.</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      Showing {filteredInvoices.length}{hasSearch && ` of ${invoices.length}`} invoices
                    </span>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {filteredInvoices.length === 0 ? (
                      <div className="py-10 text-center text-gray-500">
                        {hasSearch ? 'No invoices match your search.' : 'No invoices available.'}
                      </div>
                    ) : (
                      filteredInvoices.map((invoice) => (
                        <div key={invoice.id} className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="text-sm font-semibold text-gray-900">{invoice.id}</p>
                              <p className="text-xs text-gray-500">{invoice.customerName} • {invoice.customerEmail}</p>
                              <p className="text-xs text-gray-400 mt-1">Issued {invoice.issuedAt} • Due {invoice.dueAt}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-semibold text-gray-900">{formatCurrencyValue(invoice.total)}</p>
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-600 capitalize">
                                {invoice.status}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {invoice.items.map((item, index) => (
                              <span key={index} className="text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-1">
                                {item.description}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Operations Tab */}
          {activeTab === 'operations' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 xl:col-span-2">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <ClipboardList size={18} className="text-purple-600" />
                      <h3 className="font-semibold text-gray-900">Approval Queue</h3>
                    </div>
                    <span className="text-xs text-gray-500">{filteredApprovalQueue.length} requests</span>
                  </div>
                  <div className="space-y-3">
                    {filteredApprovalQueue.length === 0 ? (
                      <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-xl">
                        {hasSearch ? 'No approvals match your search.' : 'No approvals in the queue.'}
                      </div>
                    ) : (
                      filteredApprovalQueue.map((request) => {
                        const StatusIcon = getStatusIcon(request.status);
                        const isResolved = request.status === 'approved' || request.status === 'rejected';
                        return (
                          <div
                            key={request.id}
                            className="flex flex-col gap-4 rounded-xl border border-gray-100 p-4 md:flex-row md:items-center md:justify-between"
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getStatusColor(request.status)}`}>
                                <StatusIcon size={18} />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{request.title}</p>
                                <p className="text-xs text-gray-500">
                                  {request.requester} • {request.type}
                                </p>
                                <p className="text-xs text-gray-400">Priority: {request.priority}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(request.status)}`}>
                                {request.status}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setApprovalQueue((prev) =>
                                    prev.map((item) => (item.id === request.id ? { ...item, status: 'approved' } : item))
                                  )
                                }
                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 disabled:opacity-50"
                                disabled={isResolved}
                              >
                                Approve
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setApprovalQueue((prev) =>
                                    prev.map((item) => (item.id === request.id ? { ...item, status: 'rejected' } : item))
                                  )
                                }
                                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-700 hover:bg-red-100 disabled:opacity-50"
                                disabled={isResolved}
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <ShieldAlert size={18} className="text-purple-600" />
                      <h3 className="font-semibold text-gray-900">Security Watch</h3>
                    </div>
                    <span className="text-xs text-gray-500">{securityAlerts.length} alerts</span>
                  </div>
                  <div className="space-y-4">
                    {securityAlerts.map((alert) => {
                      const StatusIcon = getStatusIcon(alert.status);
                      return (
                        <div key={alert.id} className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(alert.status)}`}>
                            <StatusIcon size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                            <p className="text-xs text-gray-500">{alert.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-6">
                    <CheckSquare size={18} className="text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Maintenance Checklist</h3>
                  </div>
                  <div className="space-y-3">
                    {filteredMaintenanceTasks.length === 0 ? (
                      <div className="py-10 text-center text-gray-500 bg-gray-50 rounded-xl">
                        {hasSearch ? 'No tasks match your search.' : 'No maintenance tasks scheduled.'}
                      </div>
                    ) : (
                      filteredMaintenanceTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center justify-between rounded-xl border border-gray-100 p-4"
                        >
                          <label className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={task.completed}
                              onChange={() =>
                                setMaintenanceTasks((prev) =>
                                  prev.map((item) =>
                                    item.id === task.id ? { ...item, completed: !item.completed } : item
                                  )
                                )
                              }
                              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <div>
                              <p className={`text-sm font-medium ${task.completed ? 'text-gray-400 line-through' : 'text-gray-900'}`}>
                                {task.title}
                              </p>
                              <p className="text-xs text-gray-500">Owner: {task.owner}</p>
                            </div>
                          </label>
                          <span className="text-xs text-gray-400">Due {task.due}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-2 mb-6">
                    <Megaphone size={18} className="text-purple-600" />
                    <h3 className="font-semibold text-gray-900">Broadcast Center</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Announcement title</label>
                      <input
                        type="text"
                        value={broadcastDraft.title}
                        onChange={(event) => setBroadcastDraft((prev) => ({ ...prev, title: event.target.value }))}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                        placeholder="Upcoming maintenance or new feature"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Audience</label>
                        <select
                          value={broadcastDraft.audience}
                          onChange={(event) => setBroadcastDraft((prev) => ({ ...prev, audience: event.target.value }))}
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                        >
                          <option>All customers</option>
                          <option>Pro customers</option>
                          <option>Staff only</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                          value={broadcastDraft.message}
                          onChange={(event) => setBroadcastDraft((prev) => ({ ...prev, message: event.target.value }))}
                          className="w-full h-24 px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                          placeholder="Share timing, impact, and next steps."
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSendBroadcast}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-purple-500/25 hover:bg-purple-700 transition disabled:opacity-50"
                      disabled={!canSendBroadcast}
                    >
                      <Megaphone size={16} />
                      Send update
                    </button>
                    <div className="pt-2 space-y-3">
                      {filteredBroadcasts.length === 0 ? (
                        <div className="text-sm text-gray-500">No broadcasts yet.</div>
                      ) : (
                        filteredBroadcasts.map((announcement) => (
                          <div key={announcement.id} className="flex items-center justify-between text-sm">
                            <div>
                              <p className="font-medium text-gray-900">{announcement.title}</p>
                              <p className="text-xs text-gray-500">{announcement.audience}</p>
                            </div>
                            <span className="text-xs text-gray-400">{announcement.sentAt}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Category/Tag Management</h3>
                  <p className="text-sm text-gray-500">Manage product categories and tags. Drag to reorder.</p>
                </div>
                <button 
                  onClick={() => { setEditingItem(null); setModalOpen('category'); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl transition-shadow"
                >
                  <Plus size={18} />
                  Add Category
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Showing {filteredCategories.length}{hasSearch && ` of ${categories.length}`} categories
              </p>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {filteredCategories.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">
                      {hasSearch ? 'No categories match your search.' : 'No categories available.'}
                    </div>
                  ) : (
                    filteredCategories.map((category, index) => (
                      <div key={category.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <button
                            className="p-1 text-gray-400 hover:text-gray-600 cursor-grab disabled:opacity-50"
                            disabled={!allowReorder}
                          >
                            <GripVertical size={20} />
                          </button>
                          <span className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-gray-900">{category.name}</p>
                            <p className="text-xs text-gray-500">Slug: {category.slug}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 mr-4">
                            {products.filter(p => p.category === category.slug).length} products
                          </span>
                          <button 
                            onClick={() => { setEditingItem(category); setModalOpen('category'); }}
                            className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <Edit size={18} />
                          </button>
                          {category.slug !== 'all' && (
                            <button 
                              onClick={() => { if (confirm('Delete this category?')) deleteCategory(category.id); }}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              if (index > 0) {
                                const newCategories = [...categories];
                                const current = newCategories.find(c => c.id === category.id)!;
                                const prev = newCategories.find(c => c.order === category.order - 1);
                                if (prev) {
                                  current.order -= 1;
                                  prev.order += 1;
                                  reorderCategories(newCategories);
                                }
                              }
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                            disabled={!allowReorder || index === 0}
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => {
                              if (index < filteredCategories.length - 1) {
                                const newCategories = [...categories];
                                const current = newCategories.find(c => c.id === category.id)!;
                                const next = newCategories.find(c => c.order === category.order + 1);
                                if (next) {
                                  current.order += 1;
                                  next.order -= 1;
                                  reorderCategories(newCategories);
                                }
                              }
                            }}
                            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50"
                            disabled={!allowReorder || index === filteredCategories.length - 1}
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Portfolio Management</h3>
                  <p className="text-sm text-gray-500">Manage portfolio images, grid sizes, and display order.</p>
                </div>
                <button 
                  onClick={() => { setEditingItem(null); setModalOpen('portfolio'); }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl transition-shadow"
                >
                  <Plus size={18} />
                  Add Portfolio Item
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Showing {filteredPortfolio.length}{hasSearch && ` of ${portfolioItems.length}`} items
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPortfolio.length === 0 ? (
                  <div className="col-span-full py-10 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
                    {hasSearch ? 'No portfolio items match your search.' : 'No portfolio items available.'}
                  </div>
                ) : (
                  filteredPortfolio.map((item, index) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                      <div className="relative aspect-[4/3]">
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                          <button 
                            onClick={() => { setEditingItem(item); setModalOpen('portfolio'); }}
                            className="p-3 bg-white rounded-xl text-gray-700 hover:text-purple-600 transition-colors"
                          >
                            <Edit size={20} />
                          </button>
                          <button 
                            onClick={() => { if (confirm('Delete this portfolio item?')) deletePortfolioItem(item.id); }}
                            className="p-3 bg-white rounded-xl text-gray-700 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                        <span className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-xs font-medium ${
                          item.gridSize === 'large' ? 'bg-purple-500 text-white' :
                          item.gridSize === 'medium' ? 'bg-blue-500 text-white' :
                          'bg-gray-500 text-white'
                        }`}>
                          {item.gridSize}
                        </span>
                        <span className="absolute top-3 left-3 px-2 py-1 bg-black/50 text-white rounded-lg text-xs font-medium">
                          #{index + 1}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs capitalize">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                if (index > 0) {
                                  const newItems = [...portfolioItems];
                                  [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
                                  reorderPortfolio(newItems);
                                }
                              }}
                              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                              disabled={!allowReorder || index === 0}
                            >
                              ↑
                            </button>
                            <button
                              onClick={() => {
                                if (index < filteredPortfolio.length - 1) {
                                  const newItems = [...portfolioItems];
                                  [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                                  reorderPortfolio(newItems);
                                }
                              }}
                              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                              disabled={!allowReorder || index === filteredPortfolio.length - 1}
                            >
                              ↓
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* General Settings */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-6">General Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                      <input
                        type="text"
                        value={storeName}
                        onChange={(event) => setStoreName(event.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        value={contactEmail}
                        onChange={(event) => setContactEmail(event.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Security Settings */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Shield size={20} className="text-purple-600" />
                    Security Settings
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                        <p className="text-sm text-gray-500">Add extra security to your account</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTwoFactorEnabled((prev) => !prev)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium ${
                          twoFactorEnabled ? 'bg-green-600 text-white' : 'bg-purple-600 text-white'
                        }`}
                      >
                        {twoFactorEnabled ? 'Enabled' : 'Enable'}
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Login Notifications</p>
                        <p className="text-sm text-gray-500">Get notified of new logins</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLoginNotificationsEnabled((prev) => !prev)}
                        className={`w-12 h-6 rounded-full relative transition ${
                          loginNotificationsEnabled ? 'bg-purple-600' : 'bg-gray-300'
                        }`}
                        aria-label="Toggle login notifications"
                      >
                        <div
                          className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${
                            loginNotificationsEnabled ? 'right-1' : 'left-1'
                          }`}
                        ></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Session Timeout</p>
                        <p className="text-sm text-gray-500">Automatically logout after inactivity</p>
                      </div>
                      <select
                        value={sessionTimeout}
                        onChange={(event) => setSessionTimeout(event.target.value)}
                        className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm"
                      >
                        <option value="30 minutes">30 minutes</option>
                        <option value="1 hour">1 hour</option>
                        <option value="4 hours">4 hours</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Integrations */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-6">Integrations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {integrations.map((integration) => (
                      <div key={integration.name} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-900">{integration.name}</span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            integration.connected ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {integration.connected ? 'Connected' : 'Not connected'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{integration.description}</p>
                        <button
                          type="button"
                          onClick={() =>
                            setIntegrations((prev) =>
                              prev.map((item) =>
                                item.name === integration.name
                                  ? { ...item, connected: !item.connected }
                                  : item
                              )
                            )
                          }
                          className={`w-full py-2 rounded-lg text-sm font-medium ${
                            integration.connected
                              ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              : 'bg-purple-600 text-white hover:bg-purple-700'
                          }`}
                        >
                          {integration.connected ? 'Manage' : 'Connect'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      
      {/* Modal for Product CRUD */}
      {modalOpen === 'product' && (
        <ProductModal
          product={editingItem as Product | null}
          categories={categories}
          onClose={() => { setModalOpen(null); setEditingItem(null); }}
          onSave={(product) => {
            if (editingItem) {
              updateProduct(editingItem.id, product);
            } else {
              addProduct(product as Omit<Product, 'id'>);
            }
            setModalOpen(null);
            setEditingItem(null);
          }}
        />
      )}

      {/* Modal for Category CRUD */}
      {modalOpen === 'category' && (
        <CategoryModal
          category={editingItem as Category | null}
          maxOrder={Math.max(...categories.map(c => c.order), 0)}
          onClose={() => { setModalOpen(null); setEditingItem(null); }}
          onSave={(category) => {
            if (editingItem) {
              updateCategory(editingItem.id, category);
            } else {
              addCategory(category as Omit<Category, 'id'>);
            }
            setModalOpen(null);
            setEditingItem(null);
          }}
        />
      )}

      {/* Modal for Portfolio CRUD */}
      {modalOpen === 'portfolio' && (
        <PortfolioModal
          item={editingItem as PortfolioItem | null}
          categories={categories}
          onClose={() => { setModalOpen(null); setEditingItem(null); }}
          onSave={(item) => {
            if (editingItem) {
              updatePortfolioItem(editingItem.id, item);
            } else {
              addPortfolioItem(item as Omit<PortfolioItem, 'id'>);
            }
            setModalOpen(null);
            setEditingItem(null);
          }}
        />
      )}

      {/* Modal for User CRUD */}
      {modalOpen === 'user' && (
        <UserModal
          user={editingItem as User | null}
          onClose={() => { setModalOpen(null); setEditingItem(null); }}
          onSave={(user) => {
            if (editingItem) {
              updateUser(editingItem.id, user);
            } else {
              addUser(user as Omit<User, 'id' | 'createdAt'>);
            }
            setModalOpen(null);
            setEditingItem(null);
          }}
        />
      )}

      {/* Modal for Staff CRUD */}
      {modalOpen === 'staff' && (
        <StaffModal
          staff={editingItem as Staff | null}
          prefill={staffSeed}
          onClose={() => { setModalOpen(null); setEditingItem(null); setStaffSeed(null); }}
          onSave={(staff) => {
            if (editingItem) {
              updateStaff(editingItem.id, staff);
            } else {
              addStaff(staff as Omit<Staff, 'id' | 'createdAt'>);
            }
            setModalOpen(null);
            setEditingItem(null);
            setStaffSeed(null);
          }}
        />
      )}

      {/* Modal for Invoice Creation */}
      {modalOpen === 'invoice' && (
        <InvoiceModal
          formData={invoiceForm}
          currency={currency}
          onClose={() => { setModalOpen(null); setEditingItem(null); }}
          onChange={setInvoiceForm}
          onSave={(invoice) => {
            addInvoice(invoice);
            setModalOpen(null);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
}

// Product Modal Component
function ProductModal({ 
  product, 
  categories,
  onClose, 
  onSave 
}: { 
  product: Product | null; 
  categories: Category[];
  onClose: () => void; 
  onSave: (product: Partial<Product>) => void;
}) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    image: product?.image || '',
    category: product?.category || 'buildings',
    tags: product?.tags?.join(', ') || '',
    rating: product?.rating || 4.5,
    featured: product?.featured || false,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              rows={3}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              >
                {categories.filter(c => c.slug !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL or Upload</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              placeholder="https://..."
              required
            />
            <div className="mt-3 flex flex-col gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-sm text-gray-500"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Product preview"
                  className="w-full h-40 object-cover rounded-xl border border-gray-100"
                />
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              placeholder="modern, villa, luxury"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              />
            </div>
            <div className="flex items-center pt-8">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <label htmlFor="featured" className="ml-2 text-sm text-gray-700">Featured Product</label>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium flex items-center gap-2">
              <Save size={18} />
              {product ? 'Update' : 'Create'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Helper function to generate a slug from text
function generateSlug(text: string): string {
  return text.toLowerCase().replace(/\s+/g, '-');
}

// Category Modal Component
function CategoryModal({ 
  category, 
  maxOrder,
  onClose, 
  onSave 
}: { 
  category: Category | null; 
  maxOrder: number;
  onClose: () => void; 
  onSave: (category: Partial<Category>) => void;
}) {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    order: category?.order ?? maxOrder + 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {category ? 'Edit Category' : 'Add New Category'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ 
                ...formData, 
                name: e.target.value,
                slug: formData.slug || generateSlug(e.target.value),
              })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: generateSlug(e.target.value) })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              required
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium flex items-center gap-2">
              <Save size={18} />
              {category ? 'Update' : 'Create'} Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Portfolio Modal Component
function PortfolioModal({ 
  item, 
  categories,
  onClose, 
  onSave 
}: { 
  item: PortfolioItem | null; 
  categories: Category[];
  onClose: () => void; 
  onSave: (item: Partial<PortfolioItem>) => void;
}) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    description: item?.description || '',
    image: item?.image || '',
    category: item?.category || 'buildings',
    gridSize: item?.gridSize || 'medium' as 'small' | 'medium' | 'large',
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {item ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL or Upload</label>
            <input
              type="text"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              placeholder="https://..."
              required
            />
            <div className="mt-3 flex flex-col gap-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-sm text-gray-500"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Portfolio preview"
                  className="w-full h-40 object-cover rounded-xl border border-gray-100"
                />
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              >
                {categories.filter(c => c.slug !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Grid Size</label>
              <select
                value={formData.gridSize}
                onChange={(e) => setFormData({ ...formData, gridSize: e.target.value as 'small' | 'medium' | 'large' })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium flex items-center gap-2">
              <Save size={18} />
              {item ? 'Update' : 'Create'} Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// User Modal Component
function UserModal({ 
  user, 
  onClose, 
  onSave 
}: { 
  user: User | null; 
  onClose: () => void; 
  onSave: (user: Partial<User>) => void;
}) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    status: user?.status || 'active' as 'active' | 'inactive' | 'suspended',
    lastActive: user?.lastActive || 'Just now',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, role: 'customer' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {user ? 'Edit User' : 'Add New User'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' | 'suspended' })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium flex items-center gap-2">
              <Save size={18} />
              {user ? 'Update' : 'Create'} User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Staff Modal Component
function StaffModal({
  staff,
  prefill,
  onClose,
  onSave
}: {
  staff: Staff | null;
  prefill: Pick<Staff, 'name' | 'email'> | null;
  onClose: () => void;
  onSave: (staff: Partial<Staff>) => void;
}) {
  const initialName = staff?.name || prefill?.name || '';
  const initialEmail = staff?.email || prefill?.email || '';
  const [formData, setFormData] = useState({
    name: initialName,
    email: initialEmail,
    status: staff?.status || 'active' as 'active' | 'inactive',
    role: staff?.role || 'support' as 'admin' | 'moderator' | 'support',
    lastActive: staff?.lastActive || 'Just now',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            {staff ? 'Edit Staff Member' : 'Add New Staff'}
          </h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {prefill && !staff && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3 text-xs text-blue-700">
              Promoting a customer account to staff. Update the role before saving.
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'moderator' | 'support' })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              >
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="support">Support</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'inactive' })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium flex items-center gap-2">
              <Save size={18} />
              {staff ? 'Update' : 'Create'} Staff
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InvoiceModal({
  formData,
  currency,
  onClose,
  onSave,
  onChange,
}: {
  formData: {
    customerName: string;
    customerEmail: string;
    issuedAt: string;
    dueAt: string;
    status: Invoice['status'];
    items: { description: string; amount: number }[];
  };
  currency: string;
  onClose: () => void;
  onSave: (invoice: Omit<Invoice, 'id'>) => void;
  onChange: (data: {
    customerName: string;
    customerEmail: string;
    issuedAt: string;
    dueAt: string;
    status: Invoice['status'];
    items: { description: string; amount: number }[];
  }) => void;
}) {
  const total = formData.items.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

  const updateItem = (index: number, field: 'description' | 'amount', value: string) => {
    const updatedItems = formData.items.map((item, itemIndex) =>
      itemIndex === index
        ? { ...item, [field]: field === 'amount' ? Number(value) : value }
        : item
    );
    onChange({ ...formData, items: updatedItems });
  };

  const addItem = () => {
    onChange({ ...formData, items: [...formData.items, { description: '', amount: 0 }] });
  };

  const removeItem = (index: number) => {
    if (formData.items.length === 1) return;
    onChange({ ...formData, items: formData.items.filter((_, itemIndex) => itemIndex !== index) });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Create Invoice</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSave({
              customerId: formData.customerEmail ? formData.customerEmail.split('@')[0] : 'unknown',
              customerName: formData.customerName,
              customerEmail: formData.customerEmail,
              total,
              status: formData.status,
              issuedAt: formData.issuedAt,
              dueAt: formData.dueAt,
              items: formData.items,
            });
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Customer name</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(event) => onChange({ ...formData, customerName: event.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-xl text-sm"
                placeholder="Customer name"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Customer email</label>
              <input
                type="email"
                value={formData.customerEmail}
                onChange={(event) => onChange({ ...formData, customerEmail: event.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-xl text-sm"
                placeholder="customer@example.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Issued date</label>
              <input
                type="date"
                value={formData.issuedAt}
                onChange={(event) => onChange({ ...formData, issuedAt: event.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-xl text-sm"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Due date</label>
              <input
                type="date"
                value={formData.dueAt}
                onChange={(event) => onChange({ ...formData, dueAt: event.target.value })}
                className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-xl text-sm"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status}
                onChange={(event) => onChange({ ...formData, status: event.target.value as Invoice['status'] })}
                className="mt-2 w-full px-4 py-2 border border-gray-200 rounded-xl text-sm"
              >
                <option value="draft">Draft</option>
                <option value="sent">Sent</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
            <div className="flex items-end justify-between bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-600">
              <span>Total</span>
              <span className="font-semibold text-gray-900">{formatCurrency(total, currency)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Invoice items</h3>
              <button type="button" onClick={addItem} className="text-sm text-purple-600 hover:text-purple-700">
                + Add item
              </button>
            </div>
            {formData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-7 gap-3 items-center">
                <div className="md:col-span-4">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(event) => updateItem(index, 'description', event.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm"
                    placeholder="Service description"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.amount}
                    onChange={(event) => updateItem(index, 'amount', event.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm"
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="md:col-span-1 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium flex items-center gap-2">
              <Save size={18} />
              Create Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

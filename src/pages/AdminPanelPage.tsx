import { useState } from 'react';
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
  Zap,
  Globe,
  Shield,
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
} from 'lucide-react';
import { useAdminStore, type User, type Staff } from '../store/adminStore';
import type { Product, Category, PortfolioItem } from '../types';

// Mock data for the admin panel
const stats = [
  {
    label: 'Total Revenue',
    value: '$48,352',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
  },
  {
    label: 'Total Orders',
    value: '1,248',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    label: 'Active Users',
    value: '3,842',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'from-purple-500 to-pink-600',
  },
  {
    label: 'Conversion Rate',
    value: '3.24%',
    change: '-0.5%',
    trend: 'down',
    icon: TrendingUp,
    color: 'from-orange-500 to-red-600',
  },
];

const recentOrders = [
  { id: 'ORD-001', customer: 'Alex Gaming', product: 'Modern Villa Pack', amount: '$24.99', status: 'completed', date: '2 min ago' },
  { id: 'ORD-002', customer: 'BuildMaster Pro', product: 'Fantasy Castle Bundle', amount: '$34.99', status: 'processing', date: '15 min ago' },
  { id: 'ORD-003', customer: 'Creative Corp', product: 'Space Station Module', amount: '$39.99', status: 'completed', date: '1 hour ago' },
  { id: 'ORD-004', customer: 'PixelCreator', product: 'Tropical Paradise', amount: '$19.99', status: 'pending', date: '2 hours ago' },
  { id: 'ORD-005', customer: 'ServerKing', product: 'Cyberpunk Apartment', amount: '$14.99', status: 'failed', date: '3 hours ago' },
];

const userActivity = [
  { user: 'Alex Gaming', email: 'alex@gaming.com', action: 'Purchased Modern Villa Pack', time: '2 min ago', type: 'purchase' },
  { user: 'BuildMaster Pro', email: 'build@master.pro', action: 'Added item to cart', time: '5 min ago', type: 'cart' },
  { user: 'Creative Corp', email: 'info@creativecorp.com', action: 'Left a 5-star review', time: '12 min ago', type: 'review' },
  { user: 'PixelCreator', email: 'pixel@creator.net', action: 'Registered new account', time: '25 min ago', type: 'signup' },
  { user: 'ServerKing', email: 'admin@serverking.io', action: 'Submitted support ticket', time: '1 hour ago', type: 'support' },
];

// Mock sales data for top products
const productSales: Record<string, number> = {
  '1': 125, // Modern Villa Pack
  '2': 98,  // Fantasy Castle Bundle
  '3': 87,  // Tropical Paradise
  '4': 76,  // Cyberpunk Apartment
  '5': 65,  // Steampunk Airship
  '6': 54,  // Cozy Cabin Collection
  '7': 43,  // Mountain Range Terrain
  '8': 112, // Space Station Module
};

const systemHealth = [
  { name: 'API Server', status: 'operational', uptime: '99.98%' },
  { name: 'Database', status: 'operational', uptime: '99.95%' },
  { name: 'CDN', status: 'operational', uptime: '100%' },
  { name: 'Payment Gateway', status: 'degraded', uptime: '98.5%' },
];

type TabType = 'dashboard' | 'products' | 'categories' | 'portfolio' | 'orders' | 'analytics' | 'users' | 'staff' | 'settings';

// Modal types
type ModalType = 'product' | 'category' | 'portfolio' | 'user' | 'staff' | null;

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  const [editingItem, setEditingItem] = useState<Product | Category | PortfolioItem | User | Staff | null>(null);
  
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
  } = useAdminStore();

  const sidebarItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products' as TabType, label: 'Products', icon: Package },
    { id: 'categories' as TabType, label: 'Categories', icon: Tag },
    { id: 'portfolio' as TabType, label: 'Portfolio', icon: Image },
    { id: 'orders' as TabType, label: 'Orders', icon: ShoppingCart },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'users' as TabType, label: 'Users', icon: Users },
    { id: 'staff' as TabType, label: 'Staff', icon: UserCog },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  // Consolidated status configuration
  const statusConfig: Record<string, { color: string; icon: typeof CheckCircle }> = {
    completed: { color: 'text-green-600 bg-green-50', icon: CheckCircle },
    operational: { color: 'text-green-600 bg-green-50', icon: CheckCircle },
    processing: { color: 'text-blue-600 bg-blue-50', icon: RefreshCw },
    pending: { color: 'text-yellow-600 bg-yellow-50', icon: AlertCircle },
    degraded: { color: 'text-yellow-600 bg-yellow-50', icon: AlertCircle },
    failed: { color: 'text-red-600 bg-red-50', icon: XCircle },
  };

  const defaultStatusConfig = { color: 'text-gray-600 bg-gray-50', icon: Clock };

  const getStatusColor = (status: string) => {
    return (statusConfig[status] || defaultStatusConfig).color;
  };

  const getStatusIcon = (status: string) => {
    return (statusConfig[status] || defaultStatusConfig).icon;
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 bg-white border-r border-gray-200 z-40">
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
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center gap-2 text-purple-700 font-semibold mb-2">
                <Zap size={16} />
                Quick Actions
              </div>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2 py-1">
                  <FileText size={14} />
                  Generate Report
                </button>
                <button className="w-full text-left text-sm text-gray-600 hover:text-purple-600 flex items-center gap-2 py-1">
                  <Download size={14} />
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h1>
              <p className="text-gray-500 text-sm mt-1">
                {activeTab === 'dashboard' && 'Welcome back! Here\'s what\'s happening with your store.'}
                {activeTab === 'products' && 'Manage your product catalog and inventory.'}
                {activeTab === 'orders' && 'Track and manage customer orders.'}
                {activeTab === 'analytics' && 'Detailed insights into your store performance.'}
                {activeTab === 'users' && 'Manage user accounts and permissions.'}
                {activeTab === 'settings' && 'Configure your store settings and preferences.'}
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm w-64 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-100"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>

              {/* Refresh */}
              <button className="p-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
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
                    <select className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none focus:border-purple-400">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                    </select>
                  </div>
                  {/* Mock Chart */}
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[45, 62, 38, 75, 55, 82, 70].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div
                          className="w-full bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg transition-all hover:from-purple-500 hover:to-purple-300"
                          style={{ height: `${height}%` }}
                        ></div>
                        <span className="text-xs text-gray-500">
                          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Health */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">System Health</h3>
                    <Activity size={20} className="text-green-500" />
                  </div>
                  <div className="space-y-4">
                    {systemHealth.map((system, index) => {
                      const StatusIcon = getStatusIcon(system.status);
                      return (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(system.status)}`}>
                              <StatusIcon size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{system.name}</p>
                              <p className="text-xs text-gray-500">Uptime: {system.uptime}</p>
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
                    <button className="text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center gap-1">
                      View All <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {recentOrders.map((order) => {
                      const StatusIcon = getStatusIcon(order.status);
                      return (
                        <div key={order.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getStatusColor(order.status)}`}>
                              <StatusIcon size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{order.customer}</p>
                              <p className="text-xs text-gray-500">{order.product}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">{order.amount}</p>
                            <p className="text-xs text-gray-500">{order.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* User Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">User Activity</h3>
                    <button className="text-purple-600 text-sm font-medium hover:text-purple-700 flex items-center gap-1">
                      View All <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {userActivity.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
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
                  Showing {products.length} products
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
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
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
                              onClick={() => { if(confirm('Delete this product?')) deleteProduct(product.id); }}
                              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
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
                      <p className="text-2xl font-bold text-gray-900">1,248</p>
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
                      <p className="text-2xl font-bold text-gray-900">23</p>
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
                      <p className="text-2xl font-bold text-gray-900">1,180</p>
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
                      <p className="text-2xl font-bold text-gray-900">45</p>
                      <p className="text-xs text-gray-500">Failed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">All Orders</h3>
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
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6 font-mono text-sm text-purple-600">{order.id}</td>
                        <td className="py-4 px-6 font-medium text-gray-900">{order.customer}</td>
                        <td className="py-4 px-6 text-gray-600">{order.product}</td>
                        <td className="py-4 px-6 font-semibold text-gray-900">{order.amount}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-500 text-sm">{order.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Traffic Sources */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-6">Traffic Sources</h3>
                  <div className="space-y-4">
                    {[
                      { source: 'Direct', percentage: 40, color: 'bg-purple-500' },
                      { source: 'Organic Search', percentage: 30, color: 'bg-blue-500' },
                      { source: 'Social Media', percentage: 20, color: 'bg-pink-500' },
                      { source: 'Referral', percentage: 10, color: 'bg-orange-500' },
                    ].map((item, index) => (
                      <div key={index}>
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
                  </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-6">Top Selling Products</h3>
                  <div className="space-y-4">
                    {products.slice(0, 4).map((product, index) => (
                      <div key={product.id} className="flex items-center gap-4">
                        <span className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </span>
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{productSales[product.id] || 0} sales</p>
                        </div>
                        <span className="font-semibold text-gray-900">${product.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Geographic Distribution */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Geographic Distribution</h3>
                  <Globe size={20} className="text-gray-400" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { country: 'United States', visitors: '12,543', percentage: 35 },
                    { country: 'United Kingdom', visitors: '8,234', percentage: 23 },
                    { country: 'Germany', visitors: '5,432', percentage: 15 },
                    { country: 'Canada', visitors: '4,321', percentage: 12 },
                  ].map((item, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-lg font-bold text-gray-900">{item.visitors}</p>
                      <p className="text-sm text-gray-600">{item.country}</p>
                      <p className="text-xs text-purple-600 font-medium mt-1">{item.percentage}% of total</p>
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
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400">Last active: {user.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-50 text-green-600' :
                          user.status === 'inactive' ? 'bg-gray-100 text-gray-600' :
                          'bg-red-50 text-red-600'
                        }`}>
                          {user.status}
                        </span>
                        <button 
                          onClick={() => { setEditingItem(user); setModalOpen('user'); }}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => { if(confirm('Delete this user?')) deleteUser(user.id); }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
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
                    onClick={() => { setEditingItem(null); setModalOpen('staff'); }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium text-sm"
                  >
                    <Plus size={16} />
                    Add Staff
                  </button>
                </div>
                <div className="space-y-4">
                  {staff.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.email}</p>
                          <p className="text-xs text-gray-400">Last active: {member.lastActive}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
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
                          onClick={() => { setEditingItem(member); setModalOpen('staff'); }}
                          className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => { if(confirm('Delete this staff member?')) deleteStaff(member.id); }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
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

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {categories.sort((a, b) => a.order - b.order).map((category, index) => (
                    <div key={category.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <button className="p-1 text-gray-400 hover:text-gray-600 cursor-grab">
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
                            onClick={() => { if(confirm('Delete this category?')) deleteCategory(category.id); }}
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
                          disabled={index === 0}
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => {
                            if (index < categories.length - 1) {
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
                          disabled={index === categories.length - 1}
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  ))}
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

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioItems.map((item, index) => (
                  <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group">
                    <div className="relative aspect-[4/3]">
                      <img
                        src={item.image}
                        alt={item.title}
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
                          onClick={() => { if(confirm('Delete this portfolio item?')) deletePortfolioItem(item.id); }}
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
                            disabled={index === 0}
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => {
                              if (index < portfolioItems.length - 1) {
                                const newItems = [...portfolioItems];
                                [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                                reorderPortfolio(newItems);
                              }
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                            disabled={index === portfolioItems.length - 1}
                          >
                            ↓
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
                        defaultValue="Academy Studios"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        defaultValue="contact@academystudios.com"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                      <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
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
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium">
                        Enable
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Login Notifications</p>
                        <p className="text-sm text-gray-500">Get notified of new logins</p>
                      </div>
                      <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900">Session Timeout</p>
                        <p className="text-sm text-gray-500">Automatically logout after inactivity</p>
                      </div>
                      <select className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm">
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>4 hours</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Integrations */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 lg:col-span-2">
                  <h3 className="font-semibold text-gray-900 mb-6">Integrations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Stripe', description: 'Payment processing', connected: true },
                      { name: 'Discord', description: 'Community notifications', connected: true },
                      { name: 'Google Analytics', description: 'Website analytics', connected: false },
                    ].map((integration, index) => (
                      <div key={index} className="p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium text-gray-900">{integration.name}</span>
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                            integration.connected ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'
                          }`}>
                            {integration.connected ? 'Connected' : 'Not connected'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-3">{integration.description}</p>
                        <button className={`w-full py-2 rounded-lg text-sm font-medium ${
                          integration.connected
                            ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}>
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
          onClose={() => { setModalOpen(null); setEditingItem(null); }}
          onSave={(staff) => {
            if (editingItem) {
              updateStaff(editingItem.id, staff);
            } else {
              addStaff(staff as Omit<Staff, 'id' | 'createdAt'>);
            }
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              placeholder="https://..."
              required
            />
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
                slug: formData.slug || e.target.value.toLowerCase().replace(/\s+/g, '-'),
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
              onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
            <input
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-400"
              placeholder="https://..."
              required
            />
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
  onClose, 
  onSave 
}: { 
  staff: Staff | null; 
  onClose: () => void; 
  onSave: (staff: Partial<Staff>) => void;
}) {
  const [formData, setFormData] = useState({
    name: staff?.name || '',
    email: staff?.email || '',
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

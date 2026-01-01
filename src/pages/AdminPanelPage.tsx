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
  Eye,
  Download,
  RefreshCw,
  Bell,
  Search,
  Filter,
  MoreVertical,
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
} from 'lucide-react';
import { products } from '../data';

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

type TabType = 'dashboard' | 'products' | 'orders' | 'analytics' | 'users' | 'settings';

export default function AdminPanelPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const sidebarItems = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'products' as TabType, label: 'Products', icon: Package },
    { id: 'orders' as TabType, label: 'Orders', icon: ShoppingCart },
    { id: 'analytics' as TabType, label: 'Analytics', icon: BarChart3 },
    { id: 'users' as TabType, label: 'Users', icon: Users },
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
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium shadow-lg shadow-purple-500/25 hover:shadow-xl transition-shadow">
                    <Package size={18} />
                    Add Product
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                    <Filter size={18} />
                    Filters
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
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Rating</th>
                      <th className="text-left py-4 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
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
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-900">{product.rating}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                            Active
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
                              <Eye size={18} />
                            </button>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                              <MoreVertical size={18} />
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
                  <h3 className="font-semibold text-gray-900">User Management</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-medium text-sm">
                    <Users size={16} />
                    Add User
                  </button>
                </div>
                <div className="space-y-4">
                  {userActivity.map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          {user.user.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.user}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-medium">
                          Active
                        </span>
                        <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
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
    </div>
  );
}

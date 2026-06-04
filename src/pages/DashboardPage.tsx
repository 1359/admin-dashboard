import { StatCard } from "../components";
import { AlertCard } from "../components";
import { MessageCard } from "../components";
import { NotificationCard } from "../components";
import type {
  StatCardData,
  AlertCardData,
  MessageCardData,
  NotificationsCardData,
} from "../types/dashboard";
import {
  FiUsers,
  FiDollarSign,
  FiShoppingCart,
  FiActivity,
  FiTrendingUp,
  FiPackage,
} from "react-icons/fi";
const notificationsData: NotificationsCardData[] = [
  {
    id: 1,
    title: "New Login Detected",
    description: "A new device signed into your account",
    priority: "high",
    time: "2 min ago",
  },

  {
    id: 2,
    title: "Subscription Expiring",
    description: "Your premium plan expires tomorrow",
    priority: "medium",
    time: "1 hour ago",
  },

  {
    id: 3,
    title: "New Comment",
    description: "Someone commented on your post",
    priority: "low",
    time: "3 hours ago",
  },
];
const messagesData: MessageCardData[] = [
  {
    id: 1,
    sender: "Akram",
    text: "Hello there",
    status: "read",
  },
  {
    id: 2,
    sender: "Sara",
    text: "Server failed",
    status: "failed",
  },
  {
    id: 3,
    sender: "John",
    text: "Message sent",
    status: "sent",
  },
];
const alertsData: AlertCardData[] = [
  {
    id: "a1",
    title: "System Update Available",
    message:
      "Version 3.2.1 is ready to install. Schedule a maintenance window.",
    severity: "info",
    timestamp: "10 minutes ago",
    dismissible: true,
  },
  {
    id: "a2",
    title: "High Memory Usage",
    message: "Server memory is at 87%. Consider scaling up your instance.",
    severity: "warning",
    timestamp: "32 minutes ago",
    dismissible: true,
  },
  {
    id: "a3",
    title: "Payment Gateway Error",
    message: "3 transactions failed in the last hour. Check your API keys.",
    severity: "danger",
    timestamp: "1 hour ago",
    dismissible: false,
  },
  {
    id: "a4",
    title: "Backup Completed",
    message: "Daily database backup finished successfully. 2.3 GB stored.",
    severity: "success",
    timestamp: "3 hours ago",
    dismissible: true,
  },
];
// Mock data for statistics
const statsData: StatCardData[] = [
  {
    id: "1",
    label: "Total Users",
    value: "2,543",
    change: 12.5,
    icon: <FiUsers />,
    color: "blue",
    description: "Related information for id =1.",
  },
  {
    id: "2",
    label: "Revenue",
    value: "$45,231",
    change: 8.2,
    icon: <FiDollarSign />,
    color: "green",
    description: "Related information for id =2.",
  },
  {
    id: "3",
    label: "Orders",
    value: "1,234",
    change: -3.1,
    icon: <FiShoppingCart />,
    color: "purple",
    description: "Related information for id =3.",
  },
  {
    id: "4",
    label: "Active Sessions",
    value: "892",
    change: 15.3,
    icon: <FiActivity />,
    color: "orange",
    description: "Related information for id =4.",
  },
  {
    id: "5",
    label: "Conversion Rate",
    value: "3.24%",
    change: 2.4,
    icon: <FiTrendingUp />,
    color: "blue",
    description: "Related information for id =5.",
  },
  {
    id: "6",
    label: "Products",
    value: "567",
    change: 5.7,
    icon: <FiPackage />,
    color: "red",
    description: "Related information for id =6.",
  },
];
const activity = "this is summer";

const DashboardPage = () => {
  return (
    <div className="space-y-26">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your business today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat) => (
          <StatCard key={stat.id} data={stat} statActivity={activity} />
        ))}
      </div>
      {/* Alert Grid */}
      <div>
        {alertsData.map((alert) => (
          <AlertCard
            id={alert.id}
            title={alert.title}
            message={alert.message}
            serverity={alert.severity}
            timestamp={alert.dismissible}
          />
        ))}
      </div>

      {/* MessageGrid*/}
      <div>
        {messagesData.map((message) => (
          <MessageCard key={message.id} data={message} />
        ))}
      </div>
      {/*NotificationGrid*/}
      <div>
        {notificationsData.map((notification) => (
          <NotificationCard
            id={notification.id}
            priority={notification.priority}
            time={notification.time}
            title={notification.title}
            description={notification.description}
          />
        ))}
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <FiUsers />
            Add User
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
            <FiShoppingCart />
            New Order
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
            <FiPackage />
            Add Product
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
            <FiActivity />
            View Reports
          </button>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {/* Activity Items */}
          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
              <FiUsers size={18} />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">New user registered</p>
              <p className="text-sm text-gray-500">
                John Doe joined the platform
              </p>
              <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
              <FiShoppingCart size={18} />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">New order received</p>
              <p className="text-sm text-gray-500">Order #1234 - $299.99</p>
              <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
              <FiPackage size={18} />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">Product updated</p>
              <p className="text-sm text-gray-500">
                "Premium Headphones" inventory restocked
              </p>
              <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
              <FiActivity size={18} />
            </div>
            <div className="flex-1">
              <p className="text-gray-800 font-medium">System alert</p>
              <p className="text-sm text-gray-500">
                Server response time improved
              </p>
              <p className="text-xs text-gray-400 mt-1">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

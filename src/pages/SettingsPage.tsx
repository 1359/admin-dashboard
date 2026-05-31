import { FiMoon, FiSun, FiUser, FiMail, FiShield } from 'react-icons/fi';
import { useAppDispatch, useAppSelector } from '../store/store';
import { toggleTheme, selectThemeMode } from '../store/slices/themeSlice';
import { selectAuthUser } from '../store/slices/authSlice';

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const user = useAppSelector(selectAuthUser);
  const isDark = themeMode === 'dark';

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Manage your preferences and account details
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Profile
        </h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
              {user?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {user?.name}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {user?.role}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FiUser className="text-gray-400" size={18} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Username</p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {user?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FiMail className="text-gray-400" size={18} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {user?.email}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <FiShield className="text-gray-400" size={18} />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Role</p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appearance Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Appearance
        </h2>

        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            {isDark ? (
              <FiMoon className="text-blue-400" size={22} />
            ) : (
              <FiSun className="text-yellow-500" size={22} />
            )}
            <div>
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {isDark
                  ? 'Switch to a lighter interface'
                  : 'Switch to a darker interface'}
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isDark ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            aria-label="Toggle dark mode"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow transition-transform duration-300 ${
                isDark ? 'translate-x-7' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          About
        </h2>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Application</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              Admin Dashboard
            </span>
          </div>
          <div className="flex justify-between">
            <span>Version</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Stack</span>
            <span className="font-medium text-gray-800 dark:text-gray-200">
              React + Express + SQLite
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

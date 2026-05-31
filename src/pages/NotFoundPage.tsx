import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <FiAlertCircle className="text-gray-300 dark:text-gray-600" size={80} />
        </div>
        <h1 className="text-8xl font-bold text-gray-200 dark:text-gray-700">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mt-4">
          Page not found
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          <FiHome size={18} />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

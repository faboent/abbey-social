import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

export default function Dashboard() {
  const { user } = useAuth();

  // Mock data for demonstration
  const recentConnections = [
    { id: 1, name: 'Alex Thompson' },
    { id: 2, name: 'Sarah Wilson' },
    { id: 3, name: 'Michael Brown' },
  ];

  const suggestedConnections = [
    { id: 1, name: 'John Doe', role: 'Software Engineer' },
    { id: 2, name: 'Jane Smith', role: 'Product Manager' },
  ];

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Welcome Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome back, {user?.username}!
            </h2>
            <p className="text-gray-600">
              This is your personal dashboard where you can manage your connections
              and view your activity.
            </p>
          </div>

          {/* Recent Activity Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-primary-50 rounded-lg">
                <p className="text-primary-700">
                  You have 3 new connection requests
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600">
                  Your profile was viewed 12 times this week
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Connections Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Your Connections
            </h2>
            <div className="flex -space-x-2 mb-4">
              {recentConnections.map((connection) => (
                <div
                  key={connection.id}
                  className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium ring-2 ring-white"
                >
                  {connection.name.charAt(0)}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium ring-2 ring-white">
                +5
              </div>
            </div>
            <Link
              to="/connections"
              className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              View All Connections
            </Link>
          </div>

          {/* Suggested Connections Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Suggested Connections
            </h2>
            <div className="space-y-4">
              {suggestedConnections.map((person) => (
                <div
                  key={person.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm font-medium">
                      {person.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {person.name}
                      </p>
                      <p className="text-xs text-gray-500">{person.role}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-sm text-primary-600 hover:text-primary-700 border border-primary-600 hover:border-primary-700 rounded-md">
                    Connect
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Stats
            </h2>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-primary-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-700">28</p>
                <p className="text-sm text-primary-600">Connections</p>
              </div>
              <div className="p-4 bg-primary-50 rounded-lg">
                <p className="text-2xl font-bold text-primary-700">5</p>
                <p className="text-sm text-primary-600">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
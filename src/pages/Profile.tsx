import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';

export default function Profile() {
  const { user } = useAuth();
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });

  const showToast = (message: string, type: 'success' | 'info' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateProfile = () => {
    // In a real app, you would make an API call here
    showToast('Profile update functionality will be available soon!', 'info');
    setIsEditing(false);
    // Reset form data to current user data
    setFormData({
      username: user?.username || '',
      email: user?.email || ''
    });
  };

  if (!user) return null;

  return (
    <Layout>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div
            className={`rounded-md p-4 ${
              toast.type === 'success'
                ? 'bg-green-50 text-green-800'
                : toast.type === 'error'
                ? 'bg-red-50 text-red-800'
                : 'bg-blue-50 text-blue-800'
            }`}
          >
            <p>{toast.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-32 h-32 rounded-full bg-primary-500 flex items-center justify-center text-white text-4xl font-medium mb-4">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={() => showToast('Profile picture upload coming soon!', 'info')}
              className="absolute bottom-4 right-0 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200 text-primary-600 hover:text-primary-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Profile Details */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 space-y-6">
            {/* Account Details Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wider mb-4">
                Account Details
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Username</span>
                  {isEditing ? (
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <span className="font-medium text-gray-900">{user.username}</span>
                  )}
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Email</span>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <span className="font-medium text-gray-900">{user.email}</span>
                  )}
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-600">Member since</span>
                  <span className="font-medium text-gray-900">
                    {new Date(user.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Account Actions Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wider mb-4">
                Account Actions
              </h2>
              <div className="space-y-4">
                {isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleUpdateProfile}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setFormData({
                          username: user?.username || '',
                          email: user?.email || ''
                        });
                      }}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Edit Profile
                  </button>
                )}
                <button
                  onClick={() => showToast('Password change functionality coming soon!', 'info')}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Change Password
                </button>
              </div>
            </div>

            {/* Account Stats */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 uppercase tracking-wider mb-4">
                Account Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary-700">28</p>
                  <p className="text-sm text-primary-600">Total Connections</p>
                </div>
                <div className="bg-primary-50 rounded-lg p-4 text-center">
                  <p className="text-2xl font-bold text-primary-700">12</p>
                  <p className="text-sm text-primary-600">Profile Views</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
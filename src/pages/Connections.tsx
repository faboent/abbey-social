import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { connectionService } from '../services/connection';
import { Connection, ConnectionRequest, ConnectionStats } from '../types/connection';
import { User } from '../types/auth';

export default function Connections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<ConnectionStats>({ followers_count: 0, following_count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [connectionsData, requestsData, suggestionsData, statsData] = await Promise.all([
        connectionService.getConnections(),
        connectionService.getConnectionRequests(),
        connectionService.getSuggestedConnections(),
        connectionService.getConnectionStats(),
      ]);

      setConnections(connectionsData);
      setConnectionRequests(requestsData);
      setSuggestedUsers(suggestionsData);
      setStats(statsData);
    } catch (error) {
      showToast('Failed to load connections data', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleConnect = async (userId: string) => {
    try {
      await connectionService.sendConnectionRequest(userId);
      showToast('Connection request sent!', 'success');
      loadData();
    } catch (error) {
      showToast('Failed to send connection request', 'error');
    }
  };

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await connectionService.acceptConnectionRequest(requestId);
      showToast('Connection request accepted!', 'success');
      loadData();
    } catch (error) {
      showToast('Failed to accept request', 'error');
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await connectionService.rejectConnectionRequest(requestId);
      showToast('Connection request rejected', 'success');
      loadData();
    } catch (error) {
      showToast('Failed to reject request', 'error');
    }
  };

  return (
    <Layout>
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-fade-in">
          <div className={`rounded-md p-4 ${
            toast.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            <p>{toast.message}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          {/* Stats Card */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="p-6">
              <div className="flex justify-around items-center">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">{stats.followers_count}</h3>
                  <p className="text-gray-500">Followers</p>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900">{stats.following_count}</h3>
                  <p className="text-gray-500">Following</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab(0)}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === 0
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Connections
                </button>
                <button
                  onClick={() => setActiveTab(1)}
                  className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${
                    activeTab === 1
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Requests
                  {connectionRequests.length > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                      {connectionRequests.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>

            <div className="p-4">
              {activeTab === 0 ? (
                <div className="space-y-4">
                  {connections.map((connection) => (
                    <div key={connection.id} className="bg-white border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                            {connection.following?.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{connection.following?.username}</p>
                            <p className="text-sm text-gray-500">{connection.following?.email}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleConnect(connection.following_id)}
                          className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-600 hover:border-red-700 rounded-md"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {connectionRequests.map((request) => (
                    <div key={request.id} className="bg-white border rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                            {request.sender?.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{request.sender?.username}</p>
                            <p className="text-sm text-gray-500">{request.sender?.email}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAcceptRequest(request.id)}
                            className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleRejectRequest(request.id)}
                            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 border border-red-600 hover:border-red-700 rounded-md"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Suggested Connections */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Suggested Connections</h3>
              <div className="space-y-4">
                {suggestedUsers.map((user) => (
                  <div key={user.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center text-white text-sm">
                        {user.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.username}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleConnect(user.id)}
                      className="px-3 py-1 text-sm bg-primary-600 hover:bg-primary-700 text-white rounded-md"
                    >
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
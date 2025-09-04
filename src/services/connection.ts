import api from './api';
import { Connection, ConnectionRequest, ConnectionStats } from '../types/connection';
import { User } from '../types/auth';

export const connectionService = {
  // Get user's connections
  async getConnections(): Promise<Connection[]> {
    const response = await api.get('/connections');
    return response.data;
  },

  // Get connection stats
  async getConnectionStats(): Promise<ConnectionStats> {
    const response = await api.get('/connections/stats');
    return response.data;
  },

  // Get connection requests
  async getConnectionRequests(): Promise<ConnectionRequest[]> {
    const response = await api.get('/connections/requests');
    return response.data;
  },

  // Send connection request
  async sendConnectionRequest(userId: string): Promise<ConnectionRequest> {
    const response = await api.post(`/connections/requests/${userId}`);
    return response.data;
  },

  // Accept connection request
  async acceptConnectionRequest(requestId: string): Promise<Connection> {
    const response = await api.post(`/connections/requests/${requestId}/accept`);
    return response.data;
  },

  // Reject connection request
  async rejectConnectionRequest(requestId: string): Promise<void> {
    await api.post(`/connections/requests/${requestId}/reject`);
  },

  // Remove connection
  async removeConnection(userId: string): Promise<void> {
    await api.delete(`/connections/${userId}`);
  },

  // Get suggested connections
  async getSuggestedConnections(): Promise<User[]> {
    const response = await api.get('/connections/suggestions');
    return response.data;
  }
};

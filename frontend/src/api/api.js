import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Donations API calls
export const donationsAPI = {
  getAvailable: () => api.get('/donations/available'),
  getDonorDonations: () => api.get('/donations/donor'),
  getClaimedDonations: () => api.get('/donations/claimed'),
  postDonation: (data) => api.post('/donations/post', data),
  claimDonation: (donationId) => api.put(`/donations/claim/${donationId}`),
  deleteDonation: (donationId) => api.delete(`/donations/${donationId}`),
};

export default api;

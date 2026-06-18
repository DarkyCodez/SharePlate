import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { donationsAPI } from '../api/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.role !== 'donor') {
      navigate('/');
      return;
    }
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await donationsAPI.getDonorDonations();
      setDonations(response.data.data);
    } catch (err) {
      setError('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (donationId) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      try {
        await donationsAPI.deleteDonation(donationId);
        setDonations(donations.filter(d => d._id !== donationId));
        alert('Donation deleted successfully!');
      } catch (err) {
        alert('Failed to delete donation');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'claimed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-600">SharePlate</h1>
            <p className="text-gray-600 text-sm">Donor Dashboard</p>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-gray-700 font-medium">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Action Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/post-donation')}
            className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg transition"
          >
            + Post New Donation
          </button>
        </div>

        {/* Donations List */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Your Donations</h2>
          </div>

          {loading ? (
            <div className="p-6 text-center text-gray-600">Loading donations...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-600">{error}</div>
          ) : donations.length === 0 ? (
            <div className="p-6 text-center text-gray-600">
              <p>No donations posted yet. Start sharing food!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Food Item</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Location</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation._id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{donation.foodItem}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{donation.quantity} ({donation.servings})</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{donation.pickupLocation}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(donation.status)}`}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {donation.status === 'available' && (
                          <button
                            onClick={() => handleDelete(donation._id)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

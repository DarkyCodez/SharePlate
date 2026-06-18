import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { donationsAPI } from '../api/api';

export default function ReceiverFeed() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.role !== 'receiver') {
      navigate('/');
      return;
    }
    fetchAvailableDonations();
  }, []);

  const fetchAvailableDonations = async () => {
    try {
      const response = await donationsAPI.getAvailable();
      setDonations(response.data.data);
    } catch (err) {
      setError('Failed to load donations');
    } finally {
      setLoading(false);
    }
  };

  const handleClaimDonation = async (donationId) => {
    try {
      await donationsAPI.claimDonation(donationId);
      alert('Donation claimed successfully!');
      fetchAvailableDonations();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to claim donation');
    }
  };

  const handleViewClaimed = async () => {
    navigate('/claimed-donations');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-green-600">SharePlate</h1>
            <p className="text-gray-600 text-sm">Food Receiver Feed</p>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={handleViewClaimed}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              My Claims
            </button>
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Food Donations</h2>

        {loading ? (
          <div className="text-center text-gray-600 py-12">Loading donations...</div>
        ) : error ? (
          <div className="text-center text-red-600 py-12">{error}</div>
        ) : donations.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <p>No available donations at the moment. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {donations.map((donation) => (
              <div key={donation._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
                {donation.image && (
                  <img src={donation.image} alt={donation.foodItem} className="w-full h-48 object-cover" />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{donation.foodItem}</h3>
                  
                  {donation.description && (
                    <p className="text-gray-600 text-sm mb-3">{donation.description}</p>
                  )}

                  <div className="space-y-2 mb-4 text-sm">
                    <p><span className="font-semibold text-gray-700">Quantity:</span> {donation.quantity}</p>
                    <p><span className="font-semibold text-gray-700">Servings:</span> {donation.servings}</p>
                    <p><span className="font-semibold text-gray-700">Location:</span> {donation.pickupLocation}</p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Pickup:</span> {new Date(donation.pickupTime).toLocaleString()}
                    </p>
                    <p className="text-red-600">
                      <span className="font-semibold">Expires:</span> {new Date(donation.expiryTime).toLocaleString()}
                    </p>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">From:</span> {donation.donorName}
                    </p>
                    {donation.donorId?.phone && (
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Contact:</span> {donation.donorId.phone}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => handleClaimDonation(donation._id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 rounded-lg transition"
                  >
                    Claim This Donation
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

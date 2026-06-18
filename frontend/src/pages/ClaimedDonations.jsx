import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { donationsAPI } from '../api/api';

export default function ClaimedDonations() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user?.role !== 'receiver') {
      navigate('/');
      return;
    }
    fetchClaimedDonations();
  }, []);

  const fetchClaimedDonations = async () => {
    try {
      const response = await donationsAPI.getClaimedDonations();
      setDonations(response.data.data);
    } finally {
      setLoading(false);
    }
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
            <p className="text-gray-600 text-sm">My Claimed Donations</p>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate('/receiver')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Back to Feed
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
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Claimed Donations</h2>

        {loading ? (
          <div className="text-center text-gray-600 py-12">Loading...</div>
        ) : donations.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            <p>You haven't claimed any donations yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {donations.map((donation) => (
              <div key={donation._id} className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">{donation.foodItem}</h3>
                
                <div className="space-y-2 text-sm mb-4">
                  <p><span className="font-semibold text-gray-700">Quantity:</span> {donation.quantity}</p>
                  <p><span className="font-semibold text-gray-700">Servings:</span> {donation.servings}</p>
                  <p><span className="font-semibold text-gray-700">Location:</span> {donation.pickupLocation}</p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Pickup Time:</span> {new Date(donation.pickupTime).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Claimed On:</span> {new Date(donation.claimedAt).toLocaleString()}
                  </p>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">From:</span> {donation.donorName}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Contact:</span> {donation.donorId?.phone}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">Address:</span> {donation.donorId?.address}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

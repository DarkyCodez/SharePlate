import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  React.useEffect(() => {
    if (user) {
      if (user.role === 'donor') {
        navigate('/dashboard');
      } else if (user.role === 'receiver') {
        navigate('/receiver');
      }
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center">
      <div className="text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">🍽️ SharePlate</h1>
        <p className="text-xl mb-4">Connecting surplus food with those in need</p>
        <p className="text-lg mb-8 opacity-90">Fighting hunger. Building community.</p>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-green-600 font-bold px-8 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-green-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-800 transition border-2 border-white"
          >
            Register
          </button>
        </div>

        <div className="mt-12 text-sm opacity-75">
          <p>Supporting SDG 2: Zero Hunger</p>
        </div>
      </div>
    </div>
  );
}

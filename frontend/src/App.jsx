import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ReceiverFeed from './pages/ReceiverFeed';
import ClaimedDonations from './pages/ClaimedDonations';
import DonationForm from './components/DonationForm';
import './index.css';

export default function App() {
  const ProtectedRoute = ({ children, requiredRole }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!token || !user) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && user.role !== requiredRole) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="donor">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/post-donation"
          element={
            <ProtectedRoute requiredRole="donor">
              <DonationForm />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/receiver"
          element={
            <ProtectedRoute requiredRole="receiver">
              <ReceiverFeed />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/claimed-donations"
          element={
            <ProtectedRoute requiredRole="receiver">
              <ClaimedDonations />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

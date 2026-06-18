# QUICK START GUIDE - SharePlate

## Prerequisites
- Node.js (v14+)
- MongoDB (local or MongoDB Atlas)
- npm/yarn package manager

## Installation Status: ✅ COMPLETE

Both backend and frontend dependencies have been installed!

## Step 1: Ensure MongoDB is Running

### Option A: Local MongoDB
```bash
mongod
```

### Option B: MongoDB Atlas (Cloud)
Update `.env` in backend folder:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shareplate?retryWrites=true&w=majority
```

## Step 2: Start Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
🚀 SharePlate Backend Server running on port 5000
Environment: development
```

## Step 3: Start Frontend Server (New Terminal)

```bash
cd frontend
npm run dev
```

Expected output:
```
VITE v4.3.9 ready in XXX ms
➜ Local: http://localhost:3000/
```

## Step 4: Open in Browser

Navigate to: **http://localhost:3000**

## Login Credentials (for testing)

### Test Donor Account
- Email: donor@example.com
- Password: password123
- Role: Food Donor

### Test Receiver Account
- Email: receiver@example.com
- Password: password123
- Role: Food Receiver

**Note:** Create new accounts using the Register page.

## API Documentation

### Base URL
`http://localhost:5000/api`

### Endpoints

#### Auth
- `POST /auth/register` - Create new account
- `POST /auth/login` - Login with email/password

#### Donations
- `GET /donations/available` - Get all available donations
- `GET /donations/donor` - Get donor's donations (auth required)
- `GET /donations/claimed` - Get claimed donations (auth required)
- `POST /donations/post` - Post new donation (auth required)
- `PUT /donations/claim/:donationId` - Claim a donation (auth required)
- `DELETE /donations/:donationId` - Delete donation (auth required)

## Application Flow

### For Donors:
1. Register → Dashboard → Post Donation → View Posted Donations

### For Receivers:
1. Register → Feed → View Available Donations → Claim → My Claims

## Troubleshooting

### Issue: "Cannot connect to MongoDB"
**Solution:** Ensure MongoDB is running or update MONGODB_URI in .env

### Issue: "Port 5000 already in use"
**Solution:** Change PORT in backend/.env or kill process on port 5000

### Issue: "Cannot find module"
**Solution:** Run `npm install` in both backend and frontend folders

### Issue: "Frontend not connecting to backend"
**Solution:** Check CORS settings in backend/server.js and proxy in frontend/vite.config.js

## File Descriptions

### Backend Files
- `server.js` - Main Express server
- `models/User.js` - User schema with authentication
- `models/FoodDonation.js` - Food donation schema
- `routes/auth.js` - Authentication routes
- `routes/donations.js` - Donation management routes
- `middleware/auth.js` - JWT verification middleware
- `config/database.js` - MongoDB connection
- `.env` - Environment variables

### Frontend Files
- `src/App.jsx` - Main app with routing
- `src/pages/Home.jsx` - Landing page
- `src/pages/Login.jsx` - Login page
- `src/pages/Register.jsx` - Registration page
- `src/pages/Dashboard.jsx` - Donor dashboard
- `src/pages/ReceiverFeed.jsx` - Receiver donation feed
- `src/components/DonationForm.jsx` - Form to post donations
- `src/api/api.js` - API client using axios

## Development Commands

### Backend
```bash
cd backend
npm run dev      # Start with hot reload (requires nodemon)
npm start        # Start server
npm audit fix    # Fix vulnerabilities
```

### Frontend
```bash
cd frontend
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Next Steps

1. ✅ Setup complete
2. Start both servers
3. Create test accounts
4. Test donor posting donations
5. Test receiver claiming donations
6. Deploy to hosting platform (Heroku, Vercel, etc.)

## Support & Issues

For issues or questions:
1. Check the README.md for detailed documentation
2. Review backend server logs
3. Check browser console for frontend errors
4. Verify MongoDB connection
5. Ensure all environment variables are set

---

**Made with ❤️ for SDG 2: Zero Hunger**

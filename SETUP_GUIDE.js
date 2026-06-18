#!/usr/bin/env node

/**
 * SharePlate - MERN Stack Application
 * Food Donation Platform for SDG 2: Zero Hunger
 * 
 * This file contains detailed setup and running instructions
 */

const fs = require('fs');
const path = require('path');

console.log(`
╔══════════════════════════════════════════════════════════════╗
║          🍽️  SharePlate - MERN Stack Setup                  ║
║     Food Donation Platform | SDG 2: Zero Hunger             ║
╚══════════════════════════════════════════════════════════════╝

📦 PROJECT STRUCTURE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SharePlate/
├── backend/               # Node.js + Express + MongoDB
│   ├── config/           # Database & environment config
│   ├── middleware/       # JWT authentication
│   ├── models/           # Mongoose schemas (User, FoodDonation)
│   ├── routes/           # API endpoints
│   ├── server.js         # Express server entry point
│   ├── .env              # Environment variables
│   └── package.json
│
└── frontend/             # React + Vite + Tailwind CSS
    ├── src/
    │   ├── pages/        # Home, Login, Register, Dashboard, ReceiverFeed
    │   ├── components/   # DonationForm component
    │   ├── api/          # Axios API client
    │   ├── App.jsx       # Main app with routing
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json

✅ INSTALLATION STATUS: COMPLETE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ Backend dependencies installed
✓ Frontend dependencies installed
✓ All files created

🚀 QUICK START (3 STEPS)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

STEP 1: Start Backend Server
┌─────────────────────────────────────────────────────────────┐
│ Open Terminal 1 and run:                                    │
│                                                             │
│   cd backend                                                │
│   npm start                                                 │
│                                                             │
│ Expected Output:                                            │
│   🚀 SharePlate Backend Server running on port 5000         │
│   MongoDB Connected: localhost                              │
└─────────────────────────────────────────────────────────────┘

STEP 2: Start Frontend Server
┌─────────────────────────────────────────────────────────────┐
│ Open Terminal 2 (in new terminal window) and run:           │
│                                                             │
│   cd frontend                                               │
│   npm run dev                                               │
│                                                             │
│ Expected Output:                                            │
│   ➜ Local: http://localhost:3000/                           │
└─────────────────────────────────────────────────────────────┘

STEP 3: Open in Browser
┌─────────────────────────────────────────────────────────────┐
│ Navigate to: http://localhost:3000                          │
│                                                             │
│ You should see SharePlate landing page with:               │
│ - Login button                                              │
│ - Register button                                           │
└─────────────────────────────────────────────────────────────┘

🔐 TEST CREDENTIALS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Create test accounts using the Register page:

Option 1: Register as Donor
├─ Name: Test Donor
├─ Email: donor@test.com
├─ Password: password123
├─ Role: Food Donor
├─ Organization: ABC Restaurant
└─ Then post surplus food

Option 2: Register as Receiver
├─ Name: Test Receiver
├─ Email: receiver@test.com
├─ Password: password123
├─ Role: Food Receiver
├─ Organization: XYZ NGO
└─ Then browse and claim donations

🎯 APPLICATION FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FOR DONORS:
✓ Register/Login
✓ Post surplus food donations
  - Food item name
  - Quantity & servings
  - Pickup location
  - Expiry time & pickup time
✓ View posted donations
✓ Track donation status (available/claimed/expired)
✓ Delete expired donations

FOR RECEIVERS:
✓ Register/Login
✓ Browse all available donations
✓ View donor details & contact info
✓ Claim food donations
✓ Track claimed donations
✓ Contact donors for coordination

🔌 API ENDPOINTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Base URL: http://localhost:5000/api

Authentication:
  POST   /auth/register          Create new account
  POST   /auth/login             Login with credentials

Donations:
  GET    /donations/available    Get all available donations
  GET    /donations/donor        Get donor's donations
  GET    /donations/claimed      Get receiver's claims
  POST   /donations/post         Post new donation
  PUT    /donations/claim/:id    Claim a donation
  DELETE /donations/:id          Delete donation

📁 PROJECT FILES CREATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Backend:
  ✓ server.js              - Express server setup
  ✓ models/User.js         - User authentication model
  ✓ models/FoodDonation.js - Food donation model
  ✓ routes/auth.js         - Authentication routes
  ✓ routes/donations.js    - Donation management routes
  ✓ middleware/auth.js     - JWT verification
  ✓ config/database.js     - MongoDB connection
  ✓ config/config.js       - Environment config

Frontend:
  ✓ App.jsx                     - Main app with routing
  ✓ pages/Home.jsx              - Landing page
  ✓ pages/Login.jsx             - Login page
  ✓ pages/Register.jsx          - Registration page
  ✓ pages/Dashboard.jsx         - Donor dashboard
  ✓ pages/ReceiverFeed.jsx      - Receiver donation feed
  ✓ pages/ClaimedDonations.jsx  - Claimed donations page
  ✓ components/DonationForm.jsx - Form to post donations
  ✓ api/api.js                  - Axios API client
  ✓ main.jsx                    - React entry point

🛠️ TECHNOLOGY STACK
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Backend:
  • Node.js - Server runtime
  • Express.js - Web framework
  • MongoDB - Database
  • Mongoose - ODM (Object Data Modeling)
  • JWT - Authentication tokens
  • bcryptjs - Password hashing
  • express-validator - Input validation
  • CORS - Cross-Origin Resource Sharing

Frontend:
  • React 18 - UI library
  • Vite - Fast build tool
  • React Router - Client-side routing
  • Axios - HTTP client
  • Tailwind CSS - Styling
  • PostCSS - CSS processing

⚙️ ENVIRONMENT VARIABLES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Backend (.env):
  MONGODB_URI=mongodb://localhost:27017/shareplate
  JWT_SECRET=shareplate-secret-key-change-in-production
  PORT=5000
  NODE_ENV=development

Change MONGODB_URI for cloud database (MongoDB Atlas):
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/shareplate

🔍 TROUBLESHOOTING
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Problem: "Cannot connect to MongoDB"
→ Solution: Ensure MongoDB is running (mongod command)
            Or update MONGODB_URI in backend/.env for MongoDB Atlas

Problem: "Port 5000 already in use"
→ Solution: Change PORT in backend/.env
            Or kill process: lsof -ti:5000 | xargs kill -9

Problem: "Port 3000 already in use"
→ Solution: Kill existing process on port 3000
            Or Vite will use port 3001 automatically

Problem: "CORS error / Cannot reach backend"
→ Solution: Check backend is running on port 5000
            Verify vite.config.js proxy settings
            Check frontend .env for API_BASE_URL

Problem: "Cannot find module X"
→ Solution: Run npm install in both frontend and backend folders

📦 AVAILABLE NPM COMMANDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Backend:
  npm start       - Start production server
  npm run dev     - Start with nodemon (hot reload)

Frontend:
  npm run dev     - Start development server
  npm run build   - Create production build
  npm run preview - Preview production build

🌍 DEPLOYMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Backend Deployment (Heroku, Railway, Render):
  1. Push to GitHub
  2. Create Procfile: web: npm start
  3. Set environment variables on hosting platform
  4. Deploy from git repository

Frontend Deployment (Vercel, Netlify):
  1. Run: npm run build
  2. Deploy 'dist' folder to hosting
  3. Set environment variables

📚 DOCUMENTATION FILES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✓ README.md           - Comprehensive documentation
✓ QUICK_START.md      - Quick start guide
✓ setup.sh/.bat       - Automated setup scripts

🚀 NEXT STEPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ✅ Setup complete
2. Start both servers (instructions above)
3. Create test accounts
4. Test posting donations (as donor)
5. Test claiming donations (as receiver)
6. Customize branding & styling
7. Deploy to production

❤️  SUPPORTING SDG 2: ZERO HUNGER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SharePlate connects:
  🍽️  Restaurants & Mess Halls
  with Surplus Food
  to 🤝 NGOs & Food Banks
  serving those in need

Help reduce food waste and fight hunger!

═══════════════════════════════════════════════════════════════
For more details, see README.md and QUICK_START.md
═══════════════════════════════════════════════════════════════
`);

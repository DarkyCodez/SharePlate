# SharePlate - MERN Stack Food Donation Platform

A full-stack MERN (MongoDB, Express, React, Node.js) web application that connects food donors with food receivers to address SDG 2: Zero Hunger.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Key Components](#key-components)

## ✨ Features

### For Food Donors (Restaurants, Mess Halls, etc.)
- ✅ User registration and authentication
- ✅ Create and post surplus food donations
- ✅ View all posted donations
- ✅ Edit or delete donations
- ✅ Track donation status (available, claimed, expired)

### For Food Receivers (NGOs, Food Banks, etc.)
- ✅ User registration and authentication
- ✅ Browse available food donations in real-time
- ✅ View donor details and contact information
- ✅ Claim food donations with one click
- ✅ Track claimed donations
- ✅ View donor contact information for coordination

## 🛠️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** bcryptjs
- **Validation:** express-validator

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Package Manager:** npm

## 📁 Project Structure

```
SharePlate/
├── backend/
│   ├── config/
│   │   ├── config.js           # Configuration variables
│   │   └── database.js         # MongoDB connection
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/
│   │   ├── User.js             # User schema with password hashing
│   │   └── FoodDonation.js     # Food donation schema
│   ├── routes/
│   │   ├── auth.js             # Authentication routes (register, login)
│   │   └── donations.js        # Donation routes (CRUD operations)
│   ├── server.js               # Express server setup
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx               # Landing page
    │   │   ├── Login.jsx              # Login page
    │   │   ├── Register.jsx           # Registration page
    │   │   ├── Dashboard.jsx          # Donor dashboard
    │   │   ├── ReceiverFeed.jsx       # Receiver feed with donations
    │   │   └── ClaimedDonations.jsx   # Claimed donations page
    │   ├── components/
    │   │   └── DonationForm.jsx       # Form to post donations
    │   ├── api/
    │   │   └── api.js                 # API calls with axios
    │   ├── App.jsx                    # Main app component with routing
    │   ├── main.jsx                   # React entry point
    │   └── index.css                  # Tailwind CSS imports
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (local installation or MongoDB Atlas account)

## 🚀 Installation

### Step 1: Clone the Repository
```bash
cd SharePlate
```

### Step 2: Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file** in the backend folder:
```env
MONGODB_URI=mongodb://localhost:27017/shareplate
JWT_SECRET=your-secret-key-change-in-production
PORT=5000
NODE_ENV=development
```

### Step 3: Frontend Setup

```bash
cd ../frontend
npm install
```

## 🎯 Running the Application

### Start MongoDB (if running locally)
```bash
# Windows
mongod

# macOS
mongod

# Linux
sudo systemctl start mongod
```

### Start Backend Server (in terminal 1)
```bash
cd backend
npm run dev
# or
npm start
```

Backend will run on: `http://localhost:5000`

### Start Frontend Server (in terminal 2)
```bash
cd frontend
npm run dev
# or
npm start
```

Frontend will run on: `http://localhost:3000`

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| POST | `/register` | Register new user | No |
| POST | `/login` | Login user | No |

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "donor",
  "organization": "ABC Restaurant",
  "phone": "9876543210",
  "address": "123 Main St"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Donations Routes (`/api/donations`)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---|
| GET | `/available` | Get all available donations | No |
| GET | `/donor` | Get donor's donations | Yes |
| GET | `/claimed` | Get receiver's claimed donations | Yes |
| POST | `/post` | Post new donation | Yes |
| PUT | `/claim/:donationId` | Claim a donation | Yes |
| DELETE | `/:donationId` | Delete a donation | Yes |

**Post Donation Request:**
```json
{
  "foodItem": "Biryani",
  "description": "Vegetarian biryani with spices",
  "quantity": 50,
  "servings": "10-15 people",
  "pickupLocation": "123 Main Street, Downtown",
  "pickupTime": "2024-01-15T14:30:00",
  "expiryTime": "2024-01-15T18:00:00",
  "image": "https://example.com/image.jpg"
}
```

## 🧩 Key Components

### Backend Components

#### User Model (`models/User.js`)
- Handles user registration and storage
- Password hashing with bcryptjs
- Supports roles: donor, receiver, admin

#### FoodDonation Model (`models/FoodDonation.js`)
- Stores food donation details
- Tracks donation status
- Manages claim information

#### Auth Routes (`routes/auth.js`)
- User registration with validation
- User login with password verification
- JWT token generation

#### Donation Routes (`routes/donations.js`)
- CRUD operations for donations
- Claim functionality for receivers
- Filter donations by donor or receiver

### Frontend Components

#### Home (`pages/Home.jsx`)
- Landing page with login/register options
- Automatic routing based on user role

#### Register (`pages/Register.jsx`)
- User registration form
- Role selection (donor/receiver)
- Organization details

#### Login (`pages/Login.jsx`)
- Email and password authentication
- Error handling
- Automatic role-based routing

#### Dashboard (`pages/Dashboard.jsx`)
- Donor's posted donations list
- View donation status
- Delete donations
- Post new donation button

#### ReceiverFeed (`pages/ReceiverFeed.jsx`)
- Browse all available donations
- View donor information
- Claim donation with one click
- Real-time updates

#### DonationForm (`components/DonationForm.jsx`)
- Form to post new donations
- Input validation
- Food details (item, quantity, location)
- Pickup and expiry time selection

## 🔐 Security Features

- ✅ Password hashing with bcryptjs
- ✅ JWT authentication for protected routes
- ✅ Input validation on both frontend and backend
- ✅ Protected API endpoints
- ✅ Role-based access control

## 🚀 Deployment

### Backend Deployment (Heroku, Railway, etc.)
1. Create `Procfile`: `web: npm start`
2. Set environment variables on hosting platform
3. Deploy from GitHub

### Frontend Deployment (Vercel, Netlify, etc.)
1. Build: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

## 📈 Future Enhancements

- [ ] Google Maps integration for location tracking
- [ ] Email notifications for donors and receivers
- [ ] Rating and review system
- [ ] Admin dashboard for platform statistics
- [ ] Mobile app using React Native
- [ ] Push notifications
- [ ] Food waste statistics dashboard
- [ ] Donation history and analytics
- [ ] Payment integration (donation system)
- [ ] Multi-language support

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email: support@shareplate.com

## 🌍 SDG 2: Zero Hunger

SharePlate is committed to achieving SDG 2 by:
- Reducing food waste from restaurants and mess halls
- Connecting surplus food with people in need
- Building sustainable food systems
- Supporting NGOs and food banks
- Creating community awareness about food security

---

**Made with ❤️ for a zero-hunger world**

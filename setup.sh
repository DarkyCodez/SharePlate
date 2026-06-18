#!/bin/bash
# SharePlate - Setup Script

echo "🍽️  SharePlate - MERN Stack Setup"
echo "=================================="

# Backend setup
echo ""
echo "📦 Setting up Backend..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Frontend setup
echo ""
echo "📦 Setting up Frontend..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To run the application:"
echo "1. Start MongoDB (if local):"
echo "   mongod"
echo ""
echo "2. In one terminal, start the backend:"
echo "   cd backend && npm run dev"
echo ""
echo "3. In another terminal, start the frontend:"
echo "   cd frontend && npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"

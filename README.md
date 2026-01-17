# Lead Management Dashboard 🚀

A full-stack CRM-style lead management dashboard built with React, Node.js, Express, and MongoDB.

## 📋 Features

- **User Authentication**: Basic login screen
- **Lead Management**: View, search, and filter leads
- **Analytics Dashboard**: Real-time metrics showing:
  - Total Leads
  - Converted Leads
  - New Leads
  - Contacted Leads
- **Advanced Filtering**: Filter by lead status (New, Contacted, Converted)
- **Search Functionality**: Search leads by name
- **Pagination**: Navigate through leads with pagination controls
- **Lead Details**: View detailed information about individual leads
- **Mobile Responsive**: Fully responsive design

## 🛠️ Technology Stack

### Frontend
- React 19
- Vite
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB (MongoDB Atlas)
- Mongoose
- CORS

## 📁 Project Structure

```
lead_mgmt_dashboard/
├── backend/
│   ├── models/
│   │   └── Lead.js          # Mongoose schema for Lead
│   ├── routes/
│   │   └── leadRoutes.js    # API routes
│   ├── seed/
│   │   └── seedLeads.js     # Database seeding script
│   ├── index.js             # Express server entry point
│   ├── .env                 # Environment variables
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx       # Login page
    │   │   ├── Lead.jsx        # Leads dashboard
    │   │   └── LeadDetails.jsx # Lead details view
    │   ├── App.jsx             # Main app component
    │   ├── api.js              # Axios configuration
    │   └── main.jsx
    ├── .env                    # Frontend environment variables
    └── package.json
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier)

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```env
MONGO_URI=your_mongodb_atlas_connection_string
PORT=5000
```

4. Seed the database with dummy leads (creates 500 leads):
```bash
npm run seed
```

5. Start the backend server:
```bash
npm start
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables in `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

For production, update this to your deployed backend URL:
```env
VITE_API_URL=https://your-backend-url.com/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🔧 Environment Variables

### Backend (.env)
- `MONGO_URI`: MongoDB Atlas connection string
- `PORT`: Server port (default: 5000)

### Frontend (.env)
- `VITE_API_URL`: Backend API base URL

## 📡 API Endpoints

### GET /api/leads
Fetch leads with optional query parameters:
- `search`: Search by name (case-insensitive)
- `status`: Filter by status (New, Contacted, Converted)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)
- `sort`: Sort field (default: createdAt)

**Example:**
```
GET /api/leads?search=john&status=New&page=1&limit=10
```

**Response:**
```json
{
  "leads": [...],
  "total": 500
}
```

### GET /api/leads/:id
Fetch a single lead by ID

**Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "status": "New",
  "createdAt": "2026-01-17T10:30:00Z"
}
```

## 🌱 Seeding Data

The database is seeded with **500 dummy leads** using the Faker library.

To reseed the database:
```bash
cd backend
npm run seed
```

## 🎨 Demo Credentials

The app uses a simple login flow (no authentication required). Click the "Login" button on the homepage to access the dashboard.

## 🌐 Deployment

### Backend Deployment (Render/Railway/Fly.io)

1. Push code to GitHub
2. Create a new web service on your chosen platform
3. Connect your GitHub repository
4. Set environment variables:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `PORT`: 5000 (or auto-assigned)
5. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Push code to GitHub
2. Import project on Vercel/Netlify
3. Set build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Set environment variable:
   - `VITE_API_URL`: Your deployed backend URL
5. Deploy

## 🔗 Deployed Links

- **Frontend**: [YOUR_FRONTEND_URL_HERE]
- **Backend**: [YOUR_BACKEND_URL_HERE]
- **GitHub Repository**: https://github.com/hsoyal-dot/lead-mgmt-dashboard

## 📊 Database Schema

### Lead Model
```javascript
{
  name: String,
  email: String,
  company: String,
  status: {
    type: String,
    enum: ["New", "Contacted", "Converted"],
    default: "New"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}
```

## 🧪 Testing

### Manual Testing Steps

1. Start backend and frontend servers
2. Navigate to `http://localhost:5173`
3. Click "Login" to access dashboard
4. Verify analytics metrics display correctly
5. Test search functionality by typing a name
6. Test status filters (All, New, Contacted, Converted)
7. Test pagination (Previous/Next buttons)
8. Click "View Details" on any lead to view full information
9. Verify responsiveness on mobile devices

## 📧 Contact

For questions regarding this assignment, please contact: hemrajsoyal10@gmail.com

---

Built with dots ⚫️

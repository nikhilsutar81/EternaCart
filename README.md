<div align="center">
  <h1><img src="https://eternacart-client.vercel.app/android-chrome-512x512.png" width="20" height="20" alt=":EternaCart Favicon">EternaCart</h1>
  <p> A <b>Full-Stack E-Commerce Platform</b> built with the <b>MERN Stack</b>, featuring user authentication, product catalog, cart management, secure payments, and an admin dashboard for order and product management. </p>
</div>

---

# 📖 Table of Contents
- [Description](#-description)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [File Structure](#-file-structure)
- [Deployment](#-deployment)
- [Disclaimer](#-disclaimer)

---

# 📝 Description

EternaCart is a **fully functional e-commerce solution** built for learning and portfolio purposes. It demonstrates **real-world e-commerce workflows** including user registration, authentication, product catalog, shopping cart, order management, secure checkout, and admin control.

This project highlights:
- End-to-end **MERN stack development**
- **Role-based authentication (Admin & Users)**
- **Cloud-based storage** for images
- **Admin dashboard** for managing orders and inventory

---

# ✨ Features
- **User Authentication:** Email/Password & Google OAuth with JWT
- **Profile Management:** Update user details and saved addresses
- **Product Catalog:** Browse, filter by category, and search products
- **Cart & Checkout:** Add/remove items and place orders
- **Payment Methods:** Cash on Delivery
- **Admin Dashboard:** Manage products, track orders, oversee sales (WIP/future scope)
- **Cloudinary Integration:** Secure product image uploads

---

# Tech Stack

- **Frontend**: React, Redux, React Router
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT
- **Image Uploads**: Cloudinary, Multer
- **Deployment**: Vercel

---

# Screenshots

# EternaCart client side
<img width="1901" height="914" alt="Screenshot 2025-09-24 175507" src="https://github.com/user-attachments/assets/b917f0b1-af64-408d-918b-83d759b17b5d" />

# EternaCart Admin Panel:
<img width="1881" height="920" alt="Screenshot 2025-09-24 175640" src="https://github.com/user-attachments/assets/06ad12c2-9511-4080-858e-74e64f039d17" />

---

# 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/nikhilsutar81/EternaCart.git
cd eternacart
```

### 2️⃣ Install dependencies
```
Frontend:
cd client
npm install

Backend:
cd ../server
npm install

Admin:
cd ../admin
npm install
```

### 3️⃣ Configure environment variables
```
Set up .env files in server, client, and admin (see Environment Variables).
```

### 4️⃣ Run development servers
```
Backend:
cd server
npm run dev

Frontend:
cd client
npm run dev

Admin:
cd admin
npm run dev
```

---

# 🔐 Environment Variables
**Backend .env**
```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
CLOUDINARY_NAME=your_cloudinary_name
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

**Frontend .env**
```
VITE_BACKEND_URL=http://localhost:5000
```

**Admin .env**
```
VITE_BACKEND_URL=http://localhost:5000
```

---

# 📂 File Structure
```
eternacart/
├── client/                 # Customer-facing React app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page-level components
│   │   ├── redux/          # State management
│   │   └── App.jsx
│   └── package.json
│
├── admin/                  # Admin dashboard
│   ├── src/
│   │   ├── components/     # Dashboard UI
│   │   ├── pages/          # Admin pages
│   │   └── App.jsx
│   └── package.json
│
├── server/                 # Express backend
│   ├── config/             # DB & Cloudinary config
│   ├── controllers/        # Business logic
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middleware/         # Auth & error handling
│   └── server.js           # Entry point
│
├── .gitignore
└── README.md
```

---

# ☁️ Deployment
Deploy the project on Vercel:
1. Push the code to GitHub.
2. Connect the repository to Vercel.
3. Deploy all the 3 frontend, backend and admin separately.

---

# Images Credit:
- https://www.pexels.com/
- https://unsplash.com/
- https://www.freepik.com/

---

# ⚠️ Disclaimer

This project is created for educational and portfolio purposes.
All third-party assets (logos, images, etc.) are the property of their respective owners.
No copyright infringement is intended.

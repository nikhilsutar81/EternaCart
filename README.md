<div align="center">
  <h1><img src="https://leafylane-client.vercel.app/android-chrome-512x512.png" width="20" height="20" alt=":EternaCart Favicon">EternaCart</h1>
  <p>
    This project is a fully functional e-commerce website built using the MERN (MongoDB, Express, React, Node.js) stack. It features user authentication, product management, a shopping cart, order placement, and payment gateway integration. The admin dashboard allows for efficient store management, including order tracking and product uploads.
  </p>
</div>

---

# Table of Contents

- Features
- Tech Stack
- Screenshots
- Installation
- Credentials
- Deployment

---

# Features

- User authentication (Email/Password or Google OAuth via Passport.js)
- Profile update support
- Browse and filter products by category
- Product search functionality
- Add/remove items from the cart
- Two payment methods: **Stripe** (online) or **Cash on Delivery**
- Admin dashboard for order and product management (WIP/future scope)
- Image upload with **Cloudinary**

---

# Tech Stack

- **Frontend**: React, Redux, React Router
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT
- **Image Uploads**: Cloudinary, Multer
- **Deployment**: Vercel

---

# Screenshots

# LeafyLane client side
<img width="1879" height="889" alt="Screenshot 2025-09-21 130551" src="https://github.com/user-attachments/assets/6458c295-5bfc-484e-9fae-b27da95aedba" />

# LeafyLane Seller Panel:
<img width="1875" height="912" alt="Screenshot 2025-09-21 132356" src="https://github.com/user-attachments/assets/a2523a17-4aaa-463e-8529-a13f82d0c1eb" />

---

# Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nikhilsutar81/EternaCart.git
   ```
2. Navigate to the project directory:
   ```bash
   cd eternacart
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install
   cd ../backend
   npm install
   cd ../admin
   npm install
   ```
4. Start the development servers:
   ```bash
   cd frontend
   npm run dev
   ```
   ```bash
   cd backend
   npm run dev
   ```
   ```bash
   cd admin
   npm run start
   ```

---

# Credentials:

- **SELLER PANEL**  
**Email:** leafylane@gmail.com  
**Password:** leafylane@123

---

# Deployment
Deploy the project on Vercel:
1. Push the code to GitHub.
2. Connect the repository to Vercel.
3. Deploy all the 3 frontend, backend and admin separately.

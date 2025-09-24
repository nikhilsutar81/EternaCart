<div align="center">
  <h1><img src="https://eternacart-client.vercel.app/android-chrome-512x512.png" width="20" height="20" alt=":EternaCart Favicon">EternaCart</h1>
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

# EternaCart client side
<img width="1901" height="914" alt="Screenshot 2025-09-24 175507" src="https://github.com/user-attachments/assets/b917f0b1-af64-408d-918b-83d759b17b5d" />

# EternaCart Admin Panel:
<img width="1881" height="920" alt="Screenshot 2025-09-24 175640" src="https://github.com/user-attachments/assets/06ad12c2-9511-4080-858e-74e64f039d17" />

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

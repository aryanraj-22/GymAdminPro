<h1 align="center">💪 GymAdminPro - Gym Management System (MERN Stack)</h1>

<p align="center">
  A complete <strong>Gym Management System</strong> built with the <strong>MERN stack</strong> (MongoDB, Express.js, React.js, Node.js). <br/>
  It allows gym owners to manage memberships and members efficiently with a modern, user-friendly interface.
</p>

---

## 🚀 Features

- ✅ **JWT Authentication** (Login & Register with secure token-based sessions)
- 🔐 **Password Recovery with OTP via Email**
- 🏋️ Add, view, edit, and delete gym members
- 📅 Manage memberships (plans, duration, pricing)
- 📊 Dashboard with gym insights & statistics
- 📦 Backend API with RESTful routes
- 🌐 Deployed for production (Frontend + Backend)

---

## 🛠️ Tech Stack

### ⚛️ Frontend:
- React.js
- Tailwind CSS
- JavaScript (ES6+)
- Axios
- React Router

### 🖥️ Backend:
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT)
- bcrypt.js
- Nodemailer
- Crypto

---
## 📊 Dashboard Overview

The system provides an **interactive dashboard** for gym admins to track member activity and subscription status in real-time.

### Dashboard Features:
- 👥 **Joined Members** → Total members currently registered
- 📈 **Monthly Joined** → Members who joined in the current month
- ⏰ **Expiring within 3 days** → Members whose subscriptions are about to expire soon
- ⏳ **Expiring within 4–7 days** → Members with subscriptions nearing expiry
- ❌ **Expired** → Members whose subscriptions have already expired
- 🚫 **Inactive Members** → Members who are no longer active in the gym

This allows gym admins to easily manage renewals, follow-ups, and ensure smooth operations.


## 📦 Installation

### 📁 Install Dependencies

#### Backend
```bash
npm install
```
#### Frontend
```bash
cd gms-frontend
npm install
```
## ⚙️ Configure Environment Variables
Create a .env file inside the backend/ folder and add the following:
```bash
SENDER_EMAIL="email-id"
EMAIL_PASSWORD="email-password" 
PORT= Port
JWT_SecretKey=secret_key
DB_URL=Database_Url
```
## ▶️ Run the App
#### Backend
```bash
npm start
```
#### Frontend
```bash
cd gms-frontend
npm start
```
## 🧑‍🎓 Developed By: Aryan Raj
## 📬 Support
If you like this project, give it a ⭐ on GitHub.  
For queries, reach out at **aryan2210raj@gmail.com**



# EzyCart 🛒💨

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

**EzyCart** is a modern, premium, and fully responsive e-commerce web application designed for a supermarket/grocery store. It provides a seamless shopping experience for customers and a comprehensive management dashboard for administrators.

## 🚀 Live Demo
Experience the live project here: **[EzyCart Live on Firebase](https://ezycart-f3663.web.app)**

---

## 📖 Table of Contents
1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technologies Used](#technologies-used)
4. [How to View and Use](#how-to-view-and-use)
5. [Setup Instructions (Local Development)](#setup-instructions-local-development)
6. [Folder Structure](#folder-structure)
7. [Contact & Author](#contact--author)

---

## 🌟 Project Overview
EzyCart started as a simple frontend UI prototype and has evolved into a fully functional, database-driven e-commerce platform. It handles everything from user authentication and secure cart management to real-time database syncing, product reviews, promo code applications, and integrated payment processing. 

The user interface features a sleek, modern glassmorphism design that adapts perfectly to any device—whether you're browsing on a smartphone, tablet, or large desktop monitor.

---

## ✨ Key Features

### 🛍️ For Customers:
- **User Authentication:** Secure Sign Up / Log In using Firebase Auth.
- **Interactive Shopping:** Browse products, view details, and add items to your Cart or Wishlist.
- **Product Reviews & Ratings:** Customers can leave star ratings and written reviews on products.
- **Advanced Checkout:** 
  - Dynamic tax calculations (CGST/SGST).
  - Promo code application for discounts.
  - Multiple Payment Methods: Razorpay (Credit/Debit/Netbanking), UPI (with auto-generated QR codes), and Cash on Delivery.
- **Order History:** Track past orders and view detailed invoices.

### 🛡️ For Administrators:
- **Admin Dashboard:** A dedicated, secured portal accessible only to Admin accounts.
- **Inventory Management:** Add, edit, or remove products in real-time.
- **Promo Code Management:** Create and manage discount codes for marketing campaigns.
- **Order Monitoring:** View all orders placed by customers across the platform.

---

## 💻 Technologies Used
- **Frontend Core:** HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6+ Modules)
- **Backend & Database:** Google Firebase (Firestore Database, Authentication)
- **Hosting:** Firebase Hosting
- **Integrations:** Razorpay Payment API, EmailJS (for invoice emails), QRCode.js

---

## 🎯 How to View and Use

### Option 1: View the Live Website
1. Click the live demo link: [https://ezycart-f3663.web.app](https://ezycart-f3663.web.app)
2. **Browse as a Guest:** Add items to your cart and proceed to checkout.
3. **Register an Account:** Create an account to test the Wishlist, save your order history, and leave product reviews.

### Option 2: Test the Admin Dashboard
If you'd like to see the Admin features, you will need an Admin account. 
*Note: Only the database owner can promote a user to an Admin role via the Firestore database.*

---

## 🛠️ Setup Instructions (Local Development)

If you want to download the code and run it on your own computer:

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your computer.
- A free [Firebase Project](https://firebase.google.com/) (if you want to link your own database).

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Vishal-475/Ezy-cart.git
   cd Ezy-cart
   ```

2. **Start a local development server:**
   You can use any local server, such as `http-server`:
   ```bash
   npx http-server ./Frontend -c-1
   ```

3. **Open in Browser:**
   Navigate to `http://localhost:8080` in your web browser.

---

## 📁 Folder Structure
```text
Ezy-cart/
├── .firebase/               # Firebase hosting cache
├── Frontend/
│   ├── assets/              # Images, logos, and icons
│   ├── scripts/             # Modular JavaScript logic
│   │   ├── auth.js          # Firebase authentication handling
│   │   ├── firebase-config.js # Database configuration
│   │   ├── cart-manager.js  # Cart state & local storage
│   │   ├── theme.js         # Responsive design & dark mode toggles
│   │   └── ...
│   ├── styles/              # CSS files
│   │   └── style.css        # Global design system & responsive queries
│   ├── index.html           # Homepage
│   ├── categories.html      # Product listing
│   ├── checkout.html        # Secure checkout & payments
│   ├── admin.html           # Admin Dashboard
│   └── ...                  # Other HTML views
├── firebase.json            # Firebase deployment configuration
└── README.md                # Project documentation
```

---

## 📄 License
This project is licensed under the **MIT License**.

---

## 📬 Contact & Author
Built with passion by **Vishal**.

- **Email**: cool.vichuvishal4@gmail.com
- **GitHub**: [Vishal-475](https://github.com/Vishal-475)

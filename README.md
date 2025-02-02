

# EzyCart 🛒💨

## **Table of Contents**
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Setup Instructions](#setup-instations)
5. [Folder Structure](#folder-structure)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

---

## **Project Overview**
EzyCart is a **supermarket website** that allows users to browse products, add items to their cart, and simulate the checkout process. The frontend is built using **HTML, CSS, and JavaScript** and is designed to be responsive and user-friendly.

---

## **Features**
- **Product Display**:
  - View a list of products with details (name, price, quantity).
- **Cart Management**:
  - Add, update, and remove items from the cart.
- **Checkout Simulation**:
  - Simulate the checkout process with a summary of the cart.
- **Responsive Design**:
  - Works seamlessly on desktop, tablet, and mobile devices.

---

## **Technologies Used**
- **HTML**: For structuring the website.
- **CSS**: For styling and layout.
- **JavaScript**: For dynamic functionality (e.g., cart management).
- **LocalStorage**: For storing cart data temporarily.

---

## **Setup Instructions**

### **Prerequisites**
Before running the project, ensure you have the following:
- A modern web browser (e.g., Chrome, Firefox, Edge).
- A code editor (e.g., [VS Code](https://code.visualstudio.com/)).

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/Vishal-475/Ezy-cart.git
   cd Ezy-cart/frontend
   ```

2. Open the `index.html` file in your browser:
   - Simply double-click the `index.html` file, or
   - Use a live server extension in your code editor (e.g., VS Code Live Server).

---

## **Folder Structure**
```
frontend/
├── css/
│   └── style.css            # Styles for the website
├── img/                     # Images and logos
│   ├── logo/
│   └── products/
├── js/
│   └── script.js            # JavaScript for dynamic functionality
├── index.html               # Homepage
├── cart.html                # Cart page
└── checkout.html            # Checkout page
```

---

## **Usage**

### **Homepage (`index.html`)**
- Displays a list of products.
- Each product has:
  - Name
  - Price
  - Quantity
  - "Add to Cart" button.

### **Cart Page (`cart.html`)**
- Displays items added to the cart.
- Allows users to:
  - Update the quantity of items.
  - Remove items from the cart.
  - Proceed to checkout.

### **Checkout Page (`checkout.html`)**
- Simulates the checkout process.
- Displays:
  - Cart summary (products, quantities, total amount).
  - Shipping and payment details form.

---

## **JavaScript Functionality**

### **Cart Management**
- **Add to Cart**:
  - Items are added to the cart and stored in `localStorage`.
- **Update Cart**:
  - Users can update the quantity of items in the cart.
- **Remove from Cart**:
  - Items can be removed from the cart.

### **Checkout Simulation**
- Displays a summary of the cart.
- Simulates the checkout process without actual payment integration.

---

## **Contributing**
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## **Contact**
For questions or feedback, feel free to reach out:
- **Name**: Vishal
- **Email**: cool.vichuvishal4@gmail.com
- **GitHub**: [Vishal-475](https://github.com/Vishal-475)

---


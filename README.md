# 🛒 Cloud E-Commerce Application

A full-stack e-commerce web application built with **Node.js, MySQL, and Docker**, deployed locally using Docker and hosted on cloud using AWS EC2.

---

## 🚀 Features

* 🛍️ Product listing from database
* 🛒 Add to cart functionality
* ❤️ Wishlist support
* 🔍 Search products
* 💾 Local storage for cart
* 🌐 REST API (Node.js + Express)
* 🐳 Fully Dockerized application
* ☁️ Deployed on cloud (AWS EC2)

---

## 🏗️ Tech Stack

* **Frontend:** HTML, CSS, JavaScript
* **Backend:** Node.js, Express
* **Database:** MySQL
* **Containerization:** Docker & Docker Compose
* **Cloud:** AWS EC2

---

## 📁 Project Structure

```
cloud-store1/
│
├── frontend/             # Static UI (HTML, CSS, JS)
├── backend/              # Node.js API
├── docker-compose.yml    # Multi-container setup
└── README.md
```

---

# 🐳 RUN PROJECT LOCALLY (DOCKER)

## ✅ Step 1: Install Requirements

* Install Docker
* Install Docker Compose

---

## ✅ Step 2: Clone Repository

```
git clone https://github.com/maahirasyed/cloud-store1.git
cd cloud-store1
```

---

## ✅ Step 3: Start Application

```
docker-compose up --build
```

👉 This will:

* Start MySQL container 🗄️
* Start backend server 🚀
* Start frontend (Nginx) 🌐

---

## ✅ Step 4: Access Application

Frontend:

```
http://localhost:8080
```

Backend API:

```
http://localhost:3000/products
```

---

## 🛠️ DATABASE SETUP (IMPORTANT)

If products don’t show, create table manually:

```
docker exec -it ecommerce-mysql mysql -u root -p
```

Password:

```
root
```

Run:

```sql
USE ecommerce;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price INT,
    image TEXT
);

INSERT INTO products (name, price, image) VALUES
('iPhone 15', 80000, 'https://via.placeholder.com/200'),
('Laptop', 60000, 'https://via.placeholder.com/200'),
('Shoes', 3000, 'https://via.placeholder.com/200');
```

---

# ☁️ DEPLOYMENT ON AWS EC2

## ✅ Step 1: Launch EC2 Instance

* Choose Ubuntu
* Allow ports:

  * 22 (SSH)
  * 8080 (Frontend)
  * 3000 (Backend)

---

## ✅ Step 2: Connect to EC2

```
ssh -i your-key.pem ubuntu@<YOUR_PUBLIC_IP>
```

---

## ✅ Step 3: Install Docker

```
sudo apt update
sudo apt install docker.io -y
sudo apt install docker-compose -y
```

---

## ✅ Step 4: Clone Project

```
git clone https://github.com/maahirasyed/cloud-store1.git
cd cloud-store1
```

---

## ✅ Step 5: Run Application

```
sudo docker-compose up -d --build
```

---

## ✅ Step 6: Access Live App

Frontend:

```
http://<YOUR_PUBLIC_IP>:8080
```

Backend:

```
http://<YOUR_PUBLIC_IP>:3000/products
```

---

# 🌍 LIVE PROJECT

🔗 Frontend:
http://3.80.211.88:8080

🔗 Backend API:
http://3.80.211.88:3000/products

---

# ⚠️ Important Notes

* Backend DB host must be:

```
host: 'mysql'
```

* Frontend API URL must match server:

```
http://<EC2-IP>:3000/products
```

---

# 🚀 Future Improvements

* Add authentication (login/signup)
* Deploy using Kubernetes
* Add CI/CD pipeline (GitHub Actions)
* Add payment gateway

---

# 👩‍💻 Author

**Mahirunnisa SF**

---


# 🏥 Medical Equipment Inventory System

A full-stack web app I built to manage medical equipment inventory — 
tracking availability, usage status, and quantities across departments.

## 💡 Why I Built This
Managing medical equipment manually is error-prone and inefficient. 
This app solves that by giving hospital staff a simple interface to 
track equipment in real time.

## 🚀 Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js + Express.js
- **Database:** SQLite (SQL)
- **Containerization:** Docker
- **Version Control:** Git

## ✨ Features
- Add, Edit, Delete medical equipment
- Real-time search and filter by name or category
- Status tracking (Available / In Use / Maintenance)
- Live dashboard stats
- Clean REST API

## 🛠️ Run Locally

### Backend
cd server
npm install
node index.js

### Frontend
cd client
npm install
npm start

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/equipment | Fetch all equipment |
| POST | /api/equipment | Add new equipment |
| PUT | /api/equipment/:id | Update equipment |
| DELETE | /api/equipment/:id | Delete equipment |

## 👨‍💻 Author
**Gowtham Chand Manikanta Vakacharla**  
B.Tech CSE — Amrita Vishwa Vidyapeetham  
[LinkedIn](https://linkedin.com/in/gowthamchandmanikanta)

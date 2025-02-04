# Job Portal - Full Stack MERN Application

A full-stack job portal built with the MERN stack and Redux for state management. The platform allows users to search, apply for, and manage jobs, while admins can create, manage, and oversee job listings. This app is designed with efficiency, scalability, and seamless user experience in mind.

## 🚀 Key Features

### 1. User Role System
- **Admin:** Can create, manage, and oversee job postings.
- **User:** Can search for jobs, apply, and track application status.

### 2. Job Search & Filters
- Users can search for jobs with multiple filters like job title, location, company, and job type (full-time, part-time, etc.).
- Search results are dynamic and update as filters change.

### 3. Application Tracking
- Users can see the count of applications submitted for each job posting.
- Helps users gauge competition before applying.

### 4. Admin Dashboard
- **Manage Jobs:** Create, update, close, or delete job postings.
- **Company Management:** Add, update, or remove companies.
- **Application Control:** View, accept, and reject job applications.

### 5. Authentication & Authorization
- Secure JWT-based authentication.
- Role-based access control for Admins and Users.

### 6. State Management
- Redux ensures seamless state management across components.

### 7. Responsive UI
- Tailwind CSS for a modern, fast, and responsive interface.

## 🛠️ Tech Stack

**Frontend:** React, Redux, Tailwind CSS  
**Backend:** Node.js, Express.js, MongoDB  
**State Management:** Redux  
**Authentication:** JWT  
**Containerization:** Docker  

## 📌 Installation Guide

### ⚡ Run with Docker

1. **Clone the repository**
   ```sh
   git clone https://github.com/hrishabh6/Jobportal.git
   cd Jobportal
   ```

2. **Set up environment variables**
   - Copy `.env.example` from both `frontend/` and `backend/` and rename them to `.env`.
   - Fill in necessary configurations.

3. **Run the application**
   ```sh
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

### ⚙️ Manual Installation

#### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up `.env` file using `.env.example` as a reference.
4. Start the backend server:
   ```sh
   npm run dev
   ```

#### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up `.env` file using `.env.example` as a reference.
4. Start the frontend server:
   ```sh
   npm start
   ```

## 🎯 Contributing
Pull requests are welcome! If you'd like to contribute, follow these steps:
- Fork the repository.
- Create a feature branch.
- Commit your changes.
- Submit a pull request.

## 📄 License
This project is licensed under the MIT License.

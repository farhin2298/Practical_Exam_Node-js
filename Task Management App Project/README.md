# TaskMaster - Node.js Practical Exam

A minimalist Task Management Application with JWT authentication, Role-Based Access Control (RBAC), and MongoDB.

## 📁 Project Structure Explained

Is project ko **Frontend** aur **Backend** folders mein divide kiya gaya hai:

- **backend/**:
  - `controllers/`: Request handling aur logic.
  - `models/`: Database schema definitions (User, Task, Category).
  - `routes/`: URL endpoints definition.
  - `middleware/`: JWT Auth aur Role check logic.
  - `config/`: Database connection.
  - `server.js`: Main entry point.
  - `.env`: Environment variables.

- **frontend/**:
  - `views/`: EJS templates (UI).
  - `public/`: Static files (CSS/Assets).

## 🚀 How to Run

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Database Setup:**
   - Make sure MongoDB is running locally on `mongodb://127.0.0.1:27017/taskmaster`.
   - `.env` file contains the connection string.

3. **Start the Server:**
   ```bash
   node server.js
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✨ Key Features
- **JWT & Cookies:** Secure authentication using JSON Web Tokens stored in HTTP-only cookies.
- **Role-Based Access:** 
  - `user`: Apne tasks create aur manage kar sakta hai.
  - `admin`: Kisi bhi user ke tasks dekh aur edit kar sakta hai.
- **Populate:** Mongoose `.populate()` use kiya gaya hai tasks ke sath category aur user details dikhane ke liye.
- **Multi-user Support:** Har user ka apna alag data segment hai.
- **Minimalist Design:** Clean UI built with Vanilla CSS.

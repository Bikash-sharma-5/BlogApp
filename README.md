# 📝 Blogify - A Full-Stack Blog App
![Screenshot 2025-02-25 124618](https://github.com/user-attachments/assets/b91ce606-3e9b-4b96-abf4-f5526fc750be)
visit:https://bloggapp-mwkjz4v52-bikash-kumar-sharmas-projects-0c6fd68a.vercel.app
Blogify is a simple blogging platform built with **Node.js**, **Express**, **MongoDB**, and **EJS**. Users can create, read, update, and delete blogs, add comments, and authenticate using cookies.

---

## 🚀 Features
✅ User authentication (Signup/Login)  
✅ Create, Read, Update, Delete (CRUD) Blogs  
✅ Upload blog cover images  
✅ Add comments to blogs  
✅ Search blogs by category  
✅ Responsive UI with **Bootstrap & Tailwind CSS**  

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose  
- **Frontend**: EJS, Bootstrap, Tailwind CSS  
- **Authentication**: JWT & Cookies  
- **Storage**: Multer (for file uploads)  

---

## 📂 Folder Structure
/blog-app │── /public # Static assets (CSS, images, JS) │── /routes # Express route handlers │── /models # Mongoose models (Blog, User, Comment) │── /views # EJS templates │── /uploads # Uploaded images │── /services # Authentication, helpers │── .env # Environment variables │── server.js # Entry point │── README.md # Documentation

yaml
Copy
Edit

---

## 🔧 Installation & Setup

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/yourusername/blog-app.git
cd blog-app
2️⃣ Install Dependencies
bash
Copy
Edit
npm install
3️⃣ Configure Environment Variables
Create a .env file and add:

env
Copy
Edit
PORT=5000
MONGO_URI=mongodb+srv://your-db-uri
JWT_SECRET=your-secret-key
4️⃣ Start the Server
bash
Copy
Edit
npm start
or (for auto-restart during development)

bash
Copy
Edit
npm run dev


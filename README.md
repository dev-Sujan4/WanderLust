# 🏡 WanderLust — Airbnb-Style Full-Stack Web Application

WanderLust is a full-stack Airbnb-style web application where users can explore property listings, create and manage their own listings, upload listing images, and share reviews and ratings.

The project is built using **Node.js, Express.js, MongoDB, Mongoose, and EJS** and follows the **MVC (Model-View-Controller) architecture**.

## 🚀 Features

* 🔐 **User Authentication & Authorization**

  * User signup and login
  * Protected routes and user-specific actions

* 🏠 **Listing Management**

  * Create new property listings
  * View all listings
  * View individual listing details
  * Edit existing listings
  * Delete listings

* 🖼️ **Cloudinary Image Upload**

  * Upload listing images using Cloudinary
  * Image URLs and metadata stored with listings
  * Supports PNG, JPG, JPEG, and AVIF formats

* ⭐ **Reviews & Ratings**

  * Add reviews to listings
  * Rating system
  * Delete reviews
  * Dynamic rating UI

* ⚠️ **Error Handling**

  * Custom `ExpressError` class
  * Centralized Express error-handling middleware
  * `wrapAsync` utility for handling asynchronous route errors

* 💬 **Flash Messages**

  * Success and error notifications for user actions

* 📱 **Responsive UI**

  * Responsive layouts using HTML, CSS, JavaScript, and EJS

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* EJS
* EJS-Mate

### Backend

* Node.js
* Express.js
* Mongoose

### Database

* MongoDB

### Authentication

* Passport.js
* Express Session

### Image Storage

* Cloudinary
* Multer
* Multer Storage Cloudinary

### Development

* Git
* GitHub
* MVC Architecture

## 📂 Project Structure

```text
WanderLust/
│
├── classroom/
│   ├── server.js
│   └── views/
│
├── controllers/
│   ├── listing.js
│   ├── review.js
│   └── users.js
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   └── js/
│       └── script.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── middleware/
│
├── views/
│   ├── layouts/
│   ├── includes/
│   ├── listings/
│   ├── users/
│   └── error.ejs
│
├── app.js
├── cloudConfig.js
├── schema.js
├── package.json
└── .gitignore
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/dev-Sujan4/WanderLust.git
cd WanderLust
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

Keep your `.env` file private. It is excluded from Git using `.gitignore`.

### 4. Start MongoDB

Make sure MongoDB is running locally.

The application currently uses:

```text
mongodb://127.0.0.1:27017/wanderlust
```

### 5. Start the application

```bash
node app.js
```

Or, if you have a development script configured:

```bash
npm start
```

Open your browser and visit:

```text
http://localhost:8080
```

## 🔒 Environment Variables

The following credentials are required for Cloudinary image uploads:

| Variable           | Purpose               |
| ------------------ | --------------------- |
| `CLOUD_NAME`       | Cloudinary cloud name |
| `CLOUD_API_KEY`    | Cloudinary API key    |
| `CLOUD_API_SECRET` | Cloudinary API secret |

**Never commit ****`.env`**** to GitHub.**

## 🧩 Architecture

The application follows the **MVC architecture**:

```text
             User
               │
               ▼
             Routes
               │
               ▼
          Controllers
               │
        ┌──────┴──────┐
        ▼             ▼
     Models         Views
        │             │
        ▼             ▼
    MongoDB          EJS
```

This separation makes the application easier to maintain, debug, and extend.

## 📌 Future Enhancements

Planned features include:

* 🌦️ Weather information for listing locations
* 🗺️ Geocoding and interactive maps
* 💱 Currency conversion
* 🚀 Deployment with a cloud database and hosting platform
* 📱 Further UI/UX improvements

## 👨‍💻 Author

**Sujan Singh**

GitHub: [dev-Sujan4](https://github.com/dev-Sujan4)

## ⭐ Project

If you find this project useful or interesting, consider giving it a ⭐ on GitHub.

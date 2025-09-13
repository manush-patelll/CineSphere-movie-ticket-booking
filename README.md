# 🎬 CineSphere — Movie Ticket Booking

A web application for browsing movies, showtimes, and booking tickets with role-based authentication. Users can view available movies, select seats, make bookings, and view their booking history, while admins can manage movies, showtimes, and user roles. The project is split into frontend and backend components.

---

## Table of Contents

* [Deployment](#deployment)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Running the App](#running-the-app)
* [Usage](#usage)
* [Contributing](#contributing)
* [Contact](#contact)

---
## Deployment

 Deployment Link 🔗 
 
👉 **[https://cine-sphere-movie-ticket-booking.vercel.app/](https://cine-sphere-movie-ticket-booking.vercel.app/)**

---

## Features

* Browse list of movies currently showing or upcoming
* Role based Authentication for Admin and Normal users
* See details of a selected movie (description, cast, duration, rating)
* View available showtimes and select seats
* Book tickets (select seats, make payment / confirm booking)
* View booking history
* Admin panel ( To adding/editing movies, showtimes, etc.)

---

## Tech Stack

| Layer          | Technology / Tool           |
| -------------- | --------------------------- |
| Frontend       | *React.js* / *Tailwind CSS* |
| Backend        | *Node.js* + *Express*       |
| Database       | *MongoDB* Atlas             |
| Authentication | JWT + Role-Based Auth       |
| Deployment     | Vercel / Render             |

---

## Architecture

High-level structure:

```plaintext
CineSphere/
├── frontend/             ← React app
├── backend/              ← API server
└── README.md
```

* The **frontend** handles UI, user interactions, routing, seat selection, etc.
* The **backend** exposes RESTful APIs for retrieving movie and showtime data, managing bookings, users, etc.
* Database stores movies, showtimes, user info, booking data.

---

## Getting Started

### Prerequisites

* Node.js (version 20.X.X or higher)
* npm
* Database ( MongoDB ) setup and running
* Environment variables for database connection, authentication secret, etc.

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/manush-patelll/CineSphere-movie-ticket-booking.git
   cd CineSphere-movie-ticket-booking
   ```

2. **Backend setup**

   ```bash
   cd backend
   npm install
   ```

   * Create `.env` file with necessary variables, e.g.:

     ```env
     MONGO_URI=<Your Mongodb uri>
     JWT_SECRET=<Your jwt secret>
     PORT=5000
     RAZORPAY_KEY_ID=<Razorpay key id>
     RAZORPAY_SECRET=<Razorpay Secret>
     EMAIL_PASS=<Email pass>
     EMAIL_USER=<Email address>
     ```

3. **Frontend setup**

   ```bash
   cd ../frontend
   npm install
   ```

   * Create `.env` file to set API endpoints and keys:

     ```env
     VITE_VERCEL_RAZORPAY_KEY_ID=<Razorpay key id>
     ```

---

### Running the App

* Start backend server:

  ```bash
  cd backend
  npm run dev
  ```

* Start frontend:

  ```bash
  cd frontend
  npm run dev
  ```

* Open browser at `http://localhost:3000` (or whatever port frontend runs on) to use the app.

---

## Usage

* Register / login
* Browse the available movies
* Click on a movie to see showtimes and seat availability
* Select seats, confirm booking
* Review booking history from user profile
* You can give the reviews on particular movie

---

## Contributing

Contributions are welcome! Here’s how you can help:

* Open issues for bugs or feature requests
* Fork the repo, make your changes, and submit a pull request
* Follow consistent coding style
* Write tests (if set up)

---

## Contact

If you have any questions or feedback, you can reach out to:

* **Author**: [Manush Patel](https://github.com/manush-patelll)
* **GitHub**: [manush-patelll](https://github.com/manush-patelll)
* **Email**: [manush7016@gmail.com](mailto:manush7016@gmail.com)

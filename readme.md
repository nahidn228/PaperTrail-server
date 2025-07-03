# 📚 Minimal Library Management System 📚 (PaperTrail)

A RESTful Library Management API built with **Express**, **TypeScript**, and **MongoDB (Mongoose)**.  
This system manages books, borrowing operations, and provides real-time data using MongoDB's aggregation pipeline.

---

## 🚀 Features

- 📖 **Book Management (CRUD)**
- 🔍 **Filtering, Sorting, and Pagination**
- 📦 **Borrowing System with Business Logic**
- 📊 **Borrowed Books Summary via Aggregation**
- ✅ **Mongoose Middleware & Custom Methods**
- 🛡️ **Validation and Error Handling**

---

## 🛠️ Technologies Used

- **Express.js** (REST API framework)
- **TypeScript** (type safety)
- **MongoDB + Mongoose** (database & schema modeling)
- **Mongoose Middleware** (`pre`, `post`)
- **Mongoose Static & Instance Methods**
- **MongoDB Aggregation Pipeline**

---

## 💡 Why This Project?

Library management is a classic example of CRUD + business logic challenges.  
This project helps solidify concepts like:
- Data modeling using Mongoose
- API design with filtering and sorting
- Business rules (e.g., availability after borrowing)
- Aggregation pipeline for reporting




## 📚 API Endpoints

### 1. Create Book

**POST** `/api/books`

#### Request Body
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}

```

### 2. Get All Books

**GET** `/api/books?filter=SCIENCE&sortBy=createdAt&sort=desc&limit=5`


### 3.  Get Book by ID

**GET** `/api/books/:bookId`

### 4. Update Book
**PUT** `/api/edit-book/:bookId`


### 5. Delete Book
**DELETE** `/api/books/:bookId`


### 6. Borrow Book

**POST** `/api/borrow`

```json
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}

```


### 7. Borrowed Books Summary (Aggregation)
**GET** `/api/borrow`

#### Response


```json
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    },
    {
      "book": {
        "title": "1984",
        "isbn": "9780451524935"
      },
      "totalQuantity": 3
    }
  ]
}


```




## 🔧 Setup & Installation

```bash
# Clone the repository
git clone https://github.com/nahidn228/PaperTrail.git

# Navigate to the project folder
cd PaperTrail

# Install dependencies
npm install

# Create a .env file and set your MongoDB URI
DATABASE_ENV=your_mongodb_connection_string
PORT=5000

# Run the project (dev)
npm run dev

# OR build and run
npm run build
npm start

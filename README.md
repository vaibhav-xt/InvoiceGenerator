# MERN Stack with Redux Toolkit, Tailwind CSS, JWT Token, and Express Validator


https://github.com/vaibhav-xt/InvoiceGenerator/assets/90946899/ce88b352-ebda-46c4-81be-7e2836f0f8ff


## Frontend

### Routes

1. **User Registration:**
   - **Path:** `/register`
   - **Description:** User registration page.

2. **User Login:**
   - **Path:** `/login`
   - **Description:** User login page.

3. **Home Page:**
   - **Path:** `/`
   - **Description:** Home page where the user can add products and view the history of invoices.

4. **Invoice Details:**
   - **Path:** `/invoices/:_id`
   - **Description:** Page for viewing and printing a specific invoice.

5. **Log Out:**
   - **Path:** `home page button`
   - **Description:** Clicking on the logout button will log the user out.

## Backend

### API Endpoints

1. **User Registration:**
   - **Path:** `/api/register`
   - **Method:** `POST`
   - **Description:** Endpoint for user registration.

2. **User Login:**
   - **Path:** `/api/login`
   - **Method:** `POST`
   - **Description:** Endpoint for user login.

3. **Add Product:**
   - **Path:** `/api/products/add`
   - **Method:** `POST`
   - **Description:** Endpoint for adding a product.

4. **View Invoices History:**
   - **Path:** `/api/invoices`
   - **Method:** `GET`
   - **Description:** Endpoint for retrieving the history of invoices.

5. **View Invoice Details:**
   - **Path:** `/api/invoices/:_id`
   - **Method:** `GET`
   - **Description:** Endpoint for retrieving details of a specific invoice.

### Middleware

1. **Authentication Middleware:**
   - **Description:** Middleware to verify JWT token for protected routes.

### Dependencies

- **Express:** Backend web application framework.
- **Express Validator:** Middleware for input validation.
- **JWT (JSON Web Token):** For secure authentication.
- **Mongoose:** MongoDB object modeling tool.
- **bcrypt:** Library for hashing and salting passwords.

### Frontend Technologies

- **React:** JavaScript library for building user interfaces.
- **Redux Toolkit:** State management library for React.
- **Tailwind CSS:** Utility-first CSS framework.
- **axios:** HTTP client for making requests to the backend.

### Backend Setup

1. Install dependencies: `npm install`
2. Create `.env` file and add the variables mentioned in `.env.sample`
3. Run development server: `npm run dev`

### Frontend Setup

1. Install dependencies: `npm install`
2. Create `.env` file and add the variables mentioned in `.env.sample`
3. Run the development server: `npm run dev`

### Note

- Ensure the backend server is running on the specified port.
- Update API endpoints and paths in the frontend accordingly.

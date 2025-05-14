# Recipe Book Application

This project is a full-stack recipe book application consisting of a backend API built with Node.js and Express, and a frontend built with React and Next.js. The application allows users to browse recipes, filter by ingredients, country, or category, and view detailed recipe information.

---

## Project Structure

- `backend/`: Contains the backend API server code.
- `frontend/`: Contains the frontend React/Next.js application.

---

## Prerequisites

- Node.js (version 14 or higher recommended)
- npm (comes with Node.js)

---

## Setup Instructions

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory with the following content:

   ```
   MEALDB_BASE_URL=https://www.themealdb.com/api/json/v1/1
   PORT=5000
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000`.

---

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the `frontend` directory with the following content:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`.

---

## Running Both Servers in Parallel

Open two terminal windows or tabs:

- In the first terminal, start the backend server as described above.
- In the second terminal, start the frontend server as described above.

Ensure both servers are running simultaneously for the application to function correctly.

---

## Testing

- Manual testing can be done by navigating through the frontend UI, applying filters, and viewing recipe details.
- Backend endpoints can be tested using tools like `curl` or Postman:

  - Get all recipes: `GET http://localhost:5000/recipes`
  - Get recipes filtered by ingredient: `GET http://localhost:5000/recipes?ingredient=chicken`
  - Get recipe details: `GET http://localhost:5000/recipes/{id}`
  - Get filter options:
    - Ingredients: `GET http://localhost:5000/filters/ingredients`
    - Countries: `GET http://localhost:5000/filters/countries`
    - Categories: `GET http://localhost:5000/filters/categories`

---

## Code Quality

- ESLint and Prettier are configured for consistent code formatting.
- Please run linting and formatting scripts before committing changes.

---

## Additional Notes

- The application uses environment variables to configure API base URLs and ports.
- The frontend uses Tailwind CSS for styling and responsiveness.

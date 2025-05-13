# Survey Application

A simple survey application built with React, ASP.NET Core, and SQL Server. This application allows users to answer survey questions and view their submission history.

## Features

- Create and answer survey questions
- View submission history
- Real-time form validation
- Success/error notifications
- Responsive design

## Prerequisites

Before you begin, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [.NET SDK](https://dotnet.microsoft.com/download) (version 6.0 or higher)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (Express edition is fine)
- [Visual Studio](https://visualstudio.microsoft.com/) or [Visual Studio Code](https://code.visualstudio.com/)

## Getting Started

Follow these steps to run the project:

### 1. Clone the Repository

```bash
git clone [your-repository-url]
cd survey
```
### 2. Set Up the Backend

1. Open the solution in Visual Studio or VS Code
2. Open `appsettings.Developmen.json` in the backend project
3. Update the connection string with your SQL Server details:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=SurveyDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

4. Open the Package Manager Console and run:
```bash
Update-Database
```

5. Start the backend server:
```bash
cd backend
dotnet run
```
The API will be available at `https://localhost:7246`

### 3. Set Up the Frontend

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the frontend development server:
```bash
npm start
```
The application will open in your browser at `http://localhost:3000`

## Available Scripts

In the frontend directory, you can run:

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production

## Troubleshooting

1. If you get a database connection error:
   - Make sure SQL Server is running
   - Check your connection string in `appsettings.json`
   - Verify you have the correct SQL Server credentials

2. If the frontend can't connect to the backend:
   - Ensure the backend is running
   - Check the `baseURL` in your `.../config/axios.ts` file
   - Make sure the ports match in both frontend and backend

3. If you get dependency errors:
   - Delete the `node_modules` folder
   - Run `npm install` again
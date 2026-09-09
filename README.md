# Employee Management Dashboard

A responsive, modern Employee Management Dashboard built with React, Vite, and Tailwind CSS. The application features user authentication, structured data management, and interactive employee tracking capabilities.

## Features

- **Authentication Flow**: Mock login/logout system with input validation.
- **Metrics Overview**: Real-time display of key statistics including total employees, active count, and department breakdown.
- **Search & Filtering**: Search employees by name, email, or role, and filter records by department.
- **Sorting by Joining Date**: Clear ascending and descending sorting by employee joining date.
- **Pagination**: Client-side pagination handling employee lists seamlessly.
- **Detailed Modal View**: Inspect individual employee records in an overlay modal showing name, email, role, department, joining date, and employment status.
- **Clean Aesthetic**: Modern UI built with Tailwind CSS and Lucide React icons.

## Technologies Used

- **Frontend**: React (v18), Vite (v5)
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Icons**: Lucide React

## Setup Instructions

### Prerequisites

Ensure you have Node.js (v16 or higher) and npm installed on your system.

### Installation & Local Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/fijo-droid/web-developement-intern.git
   cd web-developement-intern
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Assumptions Made

- **Mock Employee Data**: Employee records are stored as local client-side dummy data in `src/data/employees.js`.
- **Demonstration Authentication**: The sign-in authentication flow is implemented for demonstration and assessment purposes; no real server authentication is connected.
- **No Production Backend / Database**: No production backend, remote API, or database is required or implemented for this frontend assessment.
- **No Real Secrets**: Only dummy data and demonstration inputs are used; no real credentials or production secrets are used in the application.

## Screenshots

*(Screenshots of the Employee Dashboard and detail views can be added here)*

# Vendor Invoice Management Application

A React-based web application for managing vendor invoices with features for creating, viewing, and managing invoice data.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd vendorapp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Features

- User authentication (Login/Logout)
- Invoice creation with file upload
- Form validation
- Vendor and invoice details management
- Responsive design

## Project Structure

```
src/
├── components/         # Reusable components
├── pages/             # Page components
├── styles/            # Global styles and variables
└── constants/         # Application constants
```

## Built With

- React
- TypeScript
- Formik - Form management
- Yup - Form validation
- SCSS Modules - Styling
- React Router - Navigation

## Development

The application uses:
- Vite for fast development
- TypeScript for type safety
- SCSS modules for component-scoped styling
- React Router for navigation
- Formik and Yup for form handling

## Routes

- `/login` - Login page
- `/dashboard` - Main dashboard with invoice form

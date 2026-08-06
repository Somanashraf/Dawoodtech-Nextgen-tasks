# 🚀 Routing & State Management App

A comprehensive multi-page React application demonstrating React Router navigation and Context API for global state management. This project implements authentication flow, theme management, and protected routes without prop drilling.

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![React Router](https://img.shields.io/badge/React%20Router-6.22.0-red.svg)](https://reactrouter.com/)
[![Vite](https://img.shields.io/badge/Vite-5.1.4-646CFF.svg)](https://vitejs.dev/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()

> **Week 6 Task** - Dawoodteck Internship Program  
> **Student:** Muhammad Soman Ashraf  
> **Status:** ✅ Complete

## 🌐 Live Demo & Repository

- **🚀 Live Demo:** [Will be added after deployment]
- **📦 GitHub Repository:** [Will be added after pushing to GitHub]

## 🎯 Project Objective

Implement single-page navigation with React Router and handle complex global states cleanly using React Context API.

## ✨ Features

### Core Functionality
- **React Router v6** - Client-side routing with nested routes
- **Context API** - Global state management for authentication and theme
- **Protected Routes** - Dashboard and Profile pages accessible only when authenticated
- **Authentication System** - Login/Register/Logout functionality
- **Theme Management** - Dark/Light mode toggle with persistence
- **Custom Hooks** - `useAuth()` and `useTheme()` for clean context access
- **Layout Wrapper** - Consistent navigation across all pages
- **404 Handling** - Custom not-found page with proper routing
- **Local Storage** - Persistent authentication and theme preferences

### Pages Included
1. **Home** - Landing page with feature showcase
2. **About** - Project information and learning outcomes
3. **Login** - User authentication page
4. **Register** - New user registration
5. **Dashboard** - Protected page with user stats (requires authentication)
6. **Profile** - Protected user profile page (requires authentication)
7. **404** - Not found page for invalid routes

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **React Router v6** - Declarative routing for React
- **Context API** - Built-in state management
- **Vite** - Next-generation frontend tooling
- **CSS3** - Custom styling with CSS variables for theming

## 📁 Project Structure

```
routing-state-management/
├── src/
│   ├── context/
│   │   ├── AuthContext.jsx       # Authentication context provider
│   │   └── ThemeContext.jsx      # Theme context provider
│   ├── components/
│   │   ├── Layout.jsx            # Main layout wrapper with navigation
│   │   └── ProtectedRoute.jsx   # Route protection component
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── About.jsx             # About page
│   │   ├── Login.jsx             # Login page
│   │   ├── Register.jsx          # Registration page
│   │   ├── Dashboard.jsx         # Protected dashboard
│   │   ├── Profile.jsx           # Protected profile page
│   │   └── NotFound.jsx          # 404 page
│   ├── App.jsx                   # Main app with route configuration
│   ├── main.jsx                  # Application entry point
│   ├── App.css                   # Component styles
│   └── index.css                 # Global styles with theme variables
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Navigate to project directory:**
   ```bash
   cd routing-state-management
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🎮 How to Use

### Authentication
1. **Register a new account:**
   - Go to `/register` page
   - Fill in name, email, and password (minimum 6 characters)
   - Submit the form to create an account

2. **Login:**
   - Go to `/login` page
   - Enter any email and password (minimum 6 characters for demo)
   - You'll be redirected to the dashboard

3. **Access Protected Routes:**
   - After logging in, you can access `/dashboard` and `/profile`
   - If you try to access these while logged out, you'll be redirected to login

4. **Logout:**
   - Click the "Logout" button in the navigation bar
   - You'll be logged out and redirected to login page

### Theme Toggle
- Click the theme toggle button (🌙/☀️) in the navigation bar
- Theme preference is saved in localStorage and persists across sessions

## 📚 Key Concepts Demonstrated

### 1. React Router Concepts
- **Nested Routes** - Layout component wraps all child routes
- **Protected Routes** - Authentication-based route access
- **Dynamic Navigation** - Programmatic navigation with `useNavigate()`
- **Route Parameters** - Demonstrating URL parameter handling
- **Location State** - Passing state between routes
- **404 Handling** - Catch-all route for undefined paths

### 2. Context API Patterns
- **Provider Pattern** - AuthProvider and ThemeProvider wrap the app
- **Custom Hooks** - `useAuth()` and `useTheme()` for consuming context
- **Avoiding Prop Drilling** - Global state accessible from any component
- **Context Composition** - Multiple contexts working together
- **Persistent State** - Using localStorage with context

### 3. Authentication Flow
```
User Not Logged In → Tries to Access Protected Route → Redirected to Login
                                                              ↓
                                                         User Logs In
                                                              ↓
                                            Redirected to Originally Requested Page
```

### 4. Code Examples

**Using Auth Context:**
```jsx
import { useAuth } from './context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user.name}!</p>
      ) : (
        <button onClick={() => login(email, password)}>Login</button>
      )}
    </div>
  );
}
```

**Protected Route Implementation:**
```jsx
<Route
  path="dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

**Using Theme Context:**
```jsx
import { useTheme } from './context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Current theme: {theme}
    </button>
  );
}
```

## 🎨 Styling

The application uses CSS variables for theming, making it easy to switch between light and dark modes:

```css
:root {
  --bg-primary: #ffffff;
  --text-primary: #1a202c;
  --accent: #4f46e5;
  /* ... more variables */
}

[data-theme='dark'] {
  --bg-primary: #1a202c;
  --text-primary: #f7fafc;
  --accent: #6366f1;
  /* ... more variables */
}
```

## 📖 Learning Outcomes

By studying and working with this project, you will:

1. ✅ Understand how to set up and configure React Router v6
2. ✅ Learn to create and use Context API for global state management
3. ✅ Implement protected routes with authentication
4. ✅ Build custom hooks for context consumption
5. ✅ Master the provider pattern for state management
6. ✅ Avoid prop drilling in complex component hierarchies
7. ✅ Handle persistent state with localStorage
8. ✅ Create a clean, maintainable application architecture
9. ✅ Implement theme toggling with CSS variables
10. ✅ Build a complete authentication flow

## 🔑 Demo Credentials

For testing purposes, the authentication is simulated:
- **Email:** Any valid email format (e.g., `user@example.com`)
- **Password:** Any password with minimum 6 characters

## 🌐 Deployment

This project can be deployed to:
- **Vercel** - `vercel --prod`
- **Netlify** - Drag and drop `dist` folder or connect GitHub repo
- **GitHub Pages** - Using `gh-pages` package
- **Any static hosting** - Upload the `dist` folder after running `npm run build`

## 📝 Additional Notes

### Context API vs Redux
This project uses Context API instead of Redux because:
- Simpler setup and less boilerplate
- Built into React (no additional dependencies)
- Perfect for small to medium-scale state management
- Easier to learn for beginners
- Sufficient for authentication and theme management

### When to Use Context API
- Authentication state
- Theme preferences
- Language/locale settings
- User preferences
- Moderate complexity state that doesn't change frequently

### When to Consider Redux
- Very large applications with complex state
- Frequent state updates
- Need for time-travel debugging
- Complex state transformations

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

**Muhammad Soman Ashraf**
- Week 6 Task: Routing & Advanced State Management
- Internship: Dawoodteck
- Date: August 2026

---

**Built with ❤️ using React, React Router, and Context API**

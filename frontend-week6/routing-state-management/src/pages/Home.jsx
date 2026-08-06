import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="page-container">
      <div className="hero">
        <h1>Welcome to Our App</h1>
        {isAuthenticated ? (
          <p className="hero-subtitle">Hello, {user?.name}! 👋</p>
        ) : (
          <p className="hero-subtitle">
            Your one-stop solution for routing and state management
          </p>
        )}
      </div>

      <div className="features">
        <div className="feature-card">
          <h3>🛣️ React Router</h3>
          <p>Navigate seamlessly between pages with nested routes and dynamic parameters</p>
        </div>
        <div className="feature-card">
          <h3>🎨 Theme Management</h3>
          <p>Toggle between light and dark themes using Context API</p>
        </div>
        <div className="feature-card">
          <h3>🔐 Authentication</h3>
          <p>Protected routes with login/register functionality</p>
        </div>
        <div className="feature-card">
          <h3>🚫 No Prop Drilling</h3>
          <p>Clean state management without passing props through multiple levels</p>
        </div>
      </div>

      {!isAuthenticated && (
        <div className="cta-section">
          <h2>Get Started Today</h2>
          <div className="cta-buttons">
            <Link to="/register" className="btn btn-primary">
              Create Account
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

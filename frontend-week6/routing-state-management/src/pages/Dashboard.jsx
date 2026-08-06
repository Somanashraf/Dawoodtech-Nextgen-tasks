import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const stats = [
    { label: 'Projects', value: '12', icon: '📁' },
    { label: 'Tasks Completed', value: '48', icon: '✅' },
    { label: 'In Progress', value: '5', icon: '⏳' },
    { label: 'Team Members', value: '8', icon: '👥' },
  ];

  const recentActivities = [
    { id: 1, action: 'Completed task: Setup React Router', time: '2 hours ago' },
    { id: 2, action: 'Created new project', time: '5 hours ago' },
    { id: 3, action: 'Updated profile information', time: '1 day ago' },
    { id: 4, action: 'Joined team collaboration', time: '2 days ago' },
  ];

  return (
    <div className="page-container">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p className="subtitle">Welcome back, {user?.name}!</p>
        </div>
        <div className="theme-indicator">
          Current Theme: <strong>{theme === 'light' ? '☀️ Light' : '🌙 Dark'}</strong>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <Link to="/profile" className="action-card">
              <span className="action-icon">👤</span>
              <span>View Profile</span>
            </Link>
            <Link to="/about" className="action-card">
              <span className="action-icon">ℹ️</span>
              <span>About Project</span>
            </Link>
            <Link to="/" className="action-card">
              <span className="action-icon">🏠</span>
              <span>Go Home</span>
            </Link>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Recent Activity</h2>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <p className="activity-action">{activity.action}</p>
                  <p className="activity-time">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="info-box">
        <h3>🎉 Protected Route Demo</h3>
        <p>
          This dashboard is a protected route. It's only accessible when you're logged in.
          Try logging out and accessing this page directly - you'll be redirected to the login page!
        </p>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Full-stack developer passionate about React and modern web technologies.',
    location: 'Pakistan',
    website: 'https://github.com/yourusername',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would update the user data here
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="page-container">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase() || '👤'}
          </div>
          <div className="profile-info">
            <h1>{user?.name}</h1>
            <p className="profile-email">{user?.email}</p>
            <button
              onClick={() => setEditMode(!editMode)}
              className="btn btn-secondary btn-sm"
            >
              {editMode ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {editMode ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Bio</label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="website">Website</label>
              <input
                type="url"
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-section">
              <h2>About</h2>
              <p>{formData.bio}</p>
            </div>

            <div className="detail-section">
              <h2>Details</h2>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">📍 Location:</span>
                  <span className="detail-value">{formData.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">🌐 Website:</span>
                  <a
                    href={formData.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-link"
                  >
                    {formData.website}
                  </a>
                </div>
                <div className="detail-item">
                  <span className="detail-label">📅 Member Since:</span>
                  <span className="detail-value">August 2026</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Preferences</h2>
              <div className="preference-item">
                <div>
                  <strong>Theme Preference</strong>
                  <p className="preference-description">
                    Current theme: {theme === 'light' ? 'Light Mode ☀️' : 'Dark Mode 🌙'}
                  </p>
                </div>
                <button onClick={toggleTheme} className="btn btn-secondary btn-sm">
                  Toggle Theme
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="info-box">
          <h3>🔐 Protected Profile</h3>
          <p>
            This is your personal profile page, accessible only when logged in. The user data
            is managed through the AuthContext, demonstrating how to avoid prop drilling.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

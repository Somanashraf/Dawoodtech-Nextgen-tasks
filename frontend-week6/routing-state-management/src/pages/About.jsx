const About = () => {
  return (
    <div className="page-container">
      <h1>About This Project</h1>
      
      <section className="about-section">
        <h2>🎯 Project Objective</h2>
        <p>
          This project demonstrates the implementation of single-page navigation using React Router
          and complex global state management using React Context API.
        </p>
      </section>

      <section className="about-section">
        <h2>🛠️ Technologies Used</h2>
        <ul className="tech-list">
          <li><strong>React 18</strong> - Modern React with hooks</li>
          <li><strong>React Router v6</strong> - Client-side routing with nested routes</li>
          <li><strong>Context API</strong> - Global state management</li>
          <li><strong>Vite</strong> - Fast build tool and development server</li>
          <li><strong>Local Storage</strong> - Persistent state across sessions</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>✨ Key Features</h2>
        <ul className="feature-list">
          <li>
            <strong>Protected Routes:</strong> Dashboard and Profile pages are only accessible
            when authenticated
          </li>
          <li>
            <strong>Authentication Context:</strong> Login/Register/Logout functionality without
            prop drilling
          </li>
          <li>
            <strong>Theme Context:</strong> Dark/Light mode toggle that persists across sessions
          </li>
          <li>
            <strong>Nested Routes:</strong> Layout wrapper with consistent navigation
          </li>
          <li>
            <strong>Dynamic Routing:</strong> User profile with dynamic parameters
          </li>
          <li>
            <strong>Custom Hooks:</strong> useAuth() and useTheme() for easy context access
          </li>
        </ul>
      </section>

      <section className="about-section">
        <h2>📚 Learning Outcomes</h2>
        <p>
          Through this project, you'll master multi-view application architecture and state
          sharing patterns without prop drilling overhead. You'll understand how to:
        </p>
        <ul className="learning-list">
          <li>Set up and configure React Router with nested routes</li>
          <li>Create and use Context Providers for global state</li>
          <li>Implement protected routes with authentication</li>
          <li>Build custom hooks for context consumption</li>
          <li>Persist state across page refreshes</li>
          <li>Create clean, maintainable component architecture</li>
        </ul>
      </section>
    </div>
  );
};

export default About;

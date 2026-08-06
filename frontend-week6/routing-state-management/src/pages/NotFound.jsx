import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-container">
      <div className="not-found">
        <h1 className="not-found-title">404</h1>
        <h2>Page Not Found</h2>
        <p className="not-found-text">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn btn-primary">
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

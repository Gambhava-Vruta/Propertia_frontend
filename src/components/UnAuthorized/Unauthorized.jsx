import { useNavigate } from 'react-router-dom';
import './Unauthorized.css';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-content">
        <div className="error-code">403</div>
        <h1>Access Denied</h1>
        <p>You don't have permission to access this page.</p>
        <p className="subtitle">Please contact your administrator if you believe this is an error.</p>
        
        <div className="action-buttons">
          <button onClick={() => navigate('/')} className="btn-primary">
            Go to Home
          </button>
          <button onClick={() => navigate(-1)} className="btn-secondary">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
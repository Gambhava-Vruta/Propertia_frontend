import { useNavigate, useLocation } from "react-router-dom";
import './Unauthorized.css';

const ALLError = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const code = params.get("code") || "500";

  const errorMessages = {
    401: {
      title: "Unauthorized",
      message: "You must login to access this page."
    },
    403: {
      title: "Access Denied",
      message: "You don't have permission to access this page."
    },
    404: {
      title: "Page Not Found",
      message: "The page you are looking for does not exist."
    },
    500: {
      title: "Server Error",
      message: "Something went wrong on our side."
    }
  };

  const error = errorMessages[code] || {
    title: "Error",
    message: "Something went wrong."
  };

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-code">{code}</div>
        <h1>{error.title}</h1>
        <p>{error.message}</p>

        <div className="action-buttons">
          <button onClick={() => navigate("/")} className="btn-primary">
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

export default ALLError;
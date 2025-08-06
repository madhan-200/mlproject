import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // make sure this image exists

const Splash = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/login'); // redirect to login page
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center">
      <img src={logo} alt="Smart Campus Logo" style={{ width: '120px', marginBottom: '20px' }} />
      <h1 className="display-5 fw-bold">Welcome to Smart Campus Portal with Ml prioritization</h1>
      <p className="lead">A Real-Time Communication and Attendance System</p>
      <button className="btn btn-primary mt-4 px-4" onClick={handleStart}>
        Get Started
      </button>
    </div>
  );
};

export default Splash;

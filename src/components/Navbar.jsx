import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = localStorage.getItem('role');
    setRole(userRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    setRole(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container-fluid px-4">
        <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" style={{ fontSize: '1.3rem' }}>
          🎓 Smart Campus <span className="ms-1 text-warning">Communication Portal With Ml prioritization</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navCollapse"
          aria-controls="navCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navCollapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <Link className="nav-link active" to="/">🏠 Home</Link>
            </li>

            {!role && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">🔐 Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">📝 Signup</Link>
                </li>
              </>
            )}

            {role && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={`/${role}-dashboard`}>📊 Dashboard</Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-warning btn-sm mt-1" onClick={handleLogout}>🚪 Logout</button>
                </li>
              </>
            )}

            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" id="moreDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                📂 More
              </span>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="moreDropdown">
                <li><Link className="dropdown-item" to="/materials">📁 Materials</Link></li>
                <li><Link className="dropdown-item" to="/notices">📢 Notices</Link></li>
                <li><Link className="dropdown-item" to="/project-info">📄 Project Info</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/contact">📞 Contact</Link></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .navbar-brand {
          animation: fadeInLeft 1s ease;
        }

        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;

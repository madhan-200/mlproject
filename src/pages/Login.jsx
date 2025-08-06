import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, password } = formData;
    const role = name.toLowerCase().trim();

    const validRoles = ['student', 'faculty', 'hod', 'mentor', 'driver'];

    if (validRoles.includes(role)) {
      localStorage.setItem('role', role);
      navigate(`/${role}-dashboard`);
    } else {
      setError('❌ Invalid role. Try: student, faculty, hod, mentor, or driver.');
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #e0f7fa, #e8f5e9)',
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: '100%',
          maxWidth: '420px',
          borderRadius: '15px',
          animation: 'slideFade 1s ease',
          backgroundColor: '#ffffff',
        }}
      >
        <div className="text-center mb-4">
          <img
            src="/src/assets/logo.png"
            onError={(e) => (e.target.style.display = 'none')}
            alt="College Logo"
            style={{ width: '60px', height: '60px', objectFit: 'contain' }}
            className="mb-3"
          />
          <h4 className="fw-bold text-primary">Smart Campus Portal with Ml prioritization</h4>
          <p className="text-muted mb-0">Login to continue</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User Role</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., student, faculty, hod"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>

          <div className="text-center mt-3">
            <small>
              Don’t have an account?{' '}
              <Link to="/signup" className="text-decoration-none text-primary">Signup here</Link>
            </small>
          </div>
        </form>
      </div>

      {/* Animation Keyframes */}
      <style>
        {`
          @keyframes slideFade {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;

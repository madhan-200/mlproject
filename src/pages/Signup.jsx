import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; // ✅ Make sure logo.png exists here

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'student'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError('Signup failed. Try with a different email.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow p-4"
        style={{
          maxWidth: '450px',
          width: '100%',
          backgroundColor: '#f8f9fa',
          borderRadius: '15px',
        }}
      >
        {/* ✅ Logo */}
        <div className="text-center mb-3">
          <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
        </div>

        <h3 className="text-center mb-3">📝 Signup</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label>Role</label>
            <select
              className="form-control"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="faculty">Faculty</option>
              <option value="hod">HOD</option>
              <option value="mentor">Mentor</option>
              <option value="driver">Driver</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

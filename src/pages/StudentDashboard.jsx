import React, { useState } from 'react';
import axios from 'axios';

const StudentDashboard = () => {
  const [materials, setMaterials] = useState([
    { title: 'Unit 1 Notes', subject: 'DBMS', url: '#' },
    { title: 'Assignment 2', subject: 'OOP', url: '#' },
  ]);

  const [requestData, setRequestData] = useState({
    subject: '',
    date: '',
    hour: '',
    reason: '',
    proofImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData({ ...requestData, [name]: value });
  };

  const handleFileChange = (e) => {
    setRequestData({ ...requestData, proofImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in requestData) {
      formData.append(key, requestData[key]);
    }

    try {
      await axios.post('http://localhost:5000/api/attendance/request', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Attendance request submitted!');
    } catch (err) {
      console.error(err);
      alert('Failed to submit request.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #e0f7fa, #fffde7)',
        padding: '40px 20px',
      }}
    >
      <div className="container">
        <div
          className="text-center mb-5"
          style={{
            backgroundColor: '#ffffffaa',
            borderRadius: '20px',
            padding: '30px 10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            animation: 'fadeInDown 1s ease',
          }}
        >
          <h2 className="fw-bold" style={{ color: '#0277bd' }}>
            🎓 Welcome to Student Dashboard
          </h2>
          <p className="text-muted">Manage your study materials and attendance requests easily</p>
        </div>

        {/* Study Materials */}
        <div
          className="mb-5"
          style={{
            backgroundColor: '#ffffff',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            animation: 'fadeIn 1s ease',
          }}
        >
          <h5 className="mb-4">📘 Study Materials</h5>
          <ul className="list-group">
            {materials.map((item, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  <strong>{item.subject}</strong> - {item.title}
                </span>
                <a
                  href={item.url}
                  className="btn btn-sm btn-outline-primary"
                  style={{ transition: '0.3s' }}
                >
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Attendance Request Form */}
        <div
          className="mb-5"
          style={{
            backgroundColor: '#ffffff',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            animation: 'fadeInUp 1s ease',
          }}
        >
          <h5 className="mb-4">📤 Attendance Correction Request</h5>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Subject</label>
              <input
                type="text"
                className="form-control"
                name="subject"
                value={requestData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={requestData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Hour</label>
              <input
                type="number"
                className="form-control"
                name="hour"
                value={requestData.hour}
                onChange={handleChange}
                min="1"
                max="8"
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Reason</label>
              <textarea
                className="form-control"
                name="reason"
                rows="3"
                value={requestData.reason}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label">Proof Image (optional)</label>
              <input
                type="file"
                className="form-control"
                name="proofImage"
                onChange={handleFileChange}
              />
            </div>
            <div className="col-12 d-grid">
              <button
                type="submit"
                className="btn btn-success btn-lg"
                style={{ transition: '0.3s', fontWeight: 'bold' }}
              >
                Submit Request
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;

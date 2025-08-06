import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DriverDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    fetchPickupRequests();
    const timer = setInterval(() => setTime(new Date()), 1000); // live clock
    return () => clearInterval(timer);
  }, []);

  const fetchPickupRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/driver/pickup-requests');
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching requests");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPickup = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/driver/confirm-pickup/${id}`);
      alert('✅ Pickup confirmed!');
      fetchPickupRequests();
    } catch (err) {
      console.error(err);
      alert('❌ Failed to confirm pickup.');
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(to right, #dce35b, #45b649)',
      minHeight: '100vh',
      padding: '30px'
    }}>
      <div className="container">
        <div className="mb-4 text-center text-white">
          <h2 className="fw-bold" style={{ animation: 'fade-in 1s ease-in' }}>🚗 Driver Dashboard</h2>
          <p className="fs-5">Live Time: {time.toLocaleTimeString()}</p>
        </div>

        <div className="card shadow-lg border-0 p-4" style={{ borderRadius: '15px', animation: 'slide-in 0.5s ease-out' }}>
          <h4 className="mb-3">📬 Pickup Requests</h4>

          {loading ? (
            <div className="text-muted">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="alert alert-light">No pickup requests right now.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Student</th>
                    <th>Message</th>
                    <th>Priority</th>
                    <th>Location</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Confirm</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id}>
                      <td>{req.studentName}</td>
                      <td>{req.message}</td>
                      <td>
                        <span className={`badge bg-${req.priority === 'high' ? 'danger' : req.priority === 'medium' ? 'warning text-dark' : 'info'}`}>
                          {req.priority.toUpperCase()}
                        </span>
                      </td>
                      <td>{req.location}</td>
                      <td>{new Date(req.time).toLocaleTimeString()}</td>
                      <td>
                        <span
                          className={`badge ${req.status === 'pending' ? 'bg-secondary pulse-badge' : 'bg-success'}`}
                        >
                          {req.status.toUpperCase()}
                        </span>
                      </td>
                      <td>
                        {req.status === 'pending' ? (
                          <button
                            className="btn btn-outline-light btn-sm"
                            onClick={() => handleConfirmPickup(req._id)}
                            style={{ transition: 'all 0.3s', fontWeight: 'bold' }}
                          >
                            Confirm
                          </button>
                        ) : (
                          <span className="text-success fw-bold">✔ Done</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes slide-in {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .pulse-badge {
          animation: pulse 1.2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(0,0,0, 0.2); }
          70% { box-shadow: 0 0 0 10px rgba(0,0,0, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0,0,0, 0); }
        }
      `}</style>
    </div>
  );
};

export default DriverDashboard;

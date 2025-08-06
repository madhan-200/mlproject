import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MentorDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/mentor/attendance-requests');
      setRequests(res.data);
    } catch (error) {
      console.error('Failed to load attendance requests:', error);
    }
  };

  const handleDecision = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/mentor/attendance/${id}`, { status });
      alert(`Request marked as ${status}`);
      fetchRequests();
    } catch (error) {
      console.error('Failed to update request status:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>🧑‍🏫 Mentor Dashboard</h3>

      <section className="mt-3">
        <h5>🕐 Attendance Correction Requests</h5>
        {requests.length === 0 ? (
          <p>No requests submitted yet.</p>
        ) : (
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>Student</th>
                <th>Date</th>
                <th>Hour</th>
                <th>Subject</th>
                <th>Reason</th>
                <th>Proof</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req._id}>
                  <td>{req.studentName}</td>
                  <td>{req.date}</td>
                  <td>{req.hour}</td>
                  <td>{req.subject}</td>
                  <td>{req.reason}</td>
                  <td>
                    {req.proofUrl ? (
                      <a href={req.proofUrl} target="_blank" rel="noreferrer">View</a>
                    ) : (
                      'No Proof'
                    )}
                  </td>
                  <td>
                    <span className={`badge bg-${req.status === 'pending' ? 'warning' : req.status === 'approved' ? 'success' : 'danger'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === 'pending' && (
                      <>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleDecision(req._id, 'approved')}
                        >
                          Approve
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDecision(req._id, 'rejected')}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default MentorDashboard;

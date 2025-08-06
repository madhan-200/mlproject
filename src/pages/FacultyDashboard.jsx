import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FacultyDashboard = () => {
  const [materials, setMaterials] = useState([]);
  const [file, setFile] = useState(null);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [proof, setProof] = useState(null);
  const [attendanceRequests, setAttendanceRequests] = useState([]);

  useEffect(() => {
    fetchAttendanceRequests();
  }, []);

  const fetchAttendanceRequests = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/faculty/attendance-requests');
      setAttendanceRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMaterialUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subject', subject);

    try {
      await axios.post('http://localhost:5000/api/faculty/upload-material', formData);
      alert('📁 Material uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('❌ Upload failed');
    }
  };

  const handleTopicUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('topic', topic);
    formData.append('subject', subject);
    formData.append('proof', proof);

    try {
      await axios.post('http://localhost:5000/api/faculty/upload-topic', formData);
      alert('📝 Topic report uploaded!');
    } catch (err) {
      console.error(err);
      alert('❌ Topic upload failed');
    }
  };

  const handleAttendanceDecision = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/faculty/attendance/${id}`, { status });
      alert(`Request ${status}`);
      fetchAttendanceRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '2rem', background: 'linear-gradient(to right, #e3f2fd, #f0f4c3)', minHeight: '100vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', animation: 'fadeInDown 1s ease' }}>
        👨‍🏫 Faculty Dashboard
      </h2>

      {/* Study Material Upload */}
      <div className="card shadow p-4 mb-4" style={{ animation: 'fadeIn 0.8s ease', borderRadius: '12px' }}>
        <h5 className="mb-3">📚 Upload Study Materials</h5>
        <form onSubmit={handleMaterialUpload}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <input
            type="file"
            className="form-control mb-2"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
          <button className="btn btn-primary w-100">Upload Material</button>
        </form>
      </div>

      {/* Topic Coverage Upload */}
      <div className="card shadow p-4 mb-4" style={{ animation: 'fadeIn 1s ease', borderRadius: '12px' }}>
        <h5 className="mb-3">📝 Submit Topic Coverage Report</h5>
        <form onSubmit={handleTopicUpload}>
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
          <input
            type="file"
            className="form-control mb-2"
            onChange={(e) => setProof(e.target.files[0])}
            required
          />
          <button className="btn btn-success w-100">Upload Topic</button>
        </form>
      </div>

      {/* Attendance Requests */}
      <div className="card shadow p-4" style={{ animation: 'fadeIn 1.2s ease', borderRadius: '12px' }}>
        <h5 className="mb-3">📥 Attendance Correction Requests</h5>
        {attendanceRequests.length === 0 ? (
          <p className="text-muted">No pending requests</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped align-middle">
              <thead className="table-light">
                <tr>
                  <th>Student</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Hour</th>
                  <th>Reason</th>
                  <th>Proof</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRequests.map((req) => (
                  <tr key={req._id}>
                    <td>{req.studentName}</td>
                    <td>{req.subject}</td>
                    <td>{req.date}</td>
                    <td>{req.hour}</td>
                    <td>{req.reason}</td>
                    <td>
                      {req.proofUrl ? (
                        <a href={req.proofUrl} target="_blank" rel="noreferrer">🔗 View</a>
                      ) : (
                        <span className="text-muted">No Proof</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => handleAttendanceDecision(req._id, 'approved')}
                      >
                        ✅ Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleAttendanceDecision(req._id, 'rejected')}
                      >
                        ❌ Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Inline keyframes for animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default FacultyDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';

const HODDashboard = () => {
  const [topicReports, setTopicReports] = useState([]);
  const [notices, setNotices] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopicReports();
  }, []);

  const fetchTopicReports = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/hod/topic-reports');
      if (Array.isArray(res.data)) setTopicReports(res.data);
      else if (Array.isArray(res.data.reports)) setTopicReports(res.data.reports);
      else setTopicReports([]);
    } catch (err) {
      console.error('Failed to fetch topic reports:', err);
      setTopicReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNoticeSend = () => {
    if (!notices) return alert("Notice can't be empty.");
    alert(`Notice sent: "${notices}"`);
    setNotices('');
  };

  // Dummy student progress data
  const progressData = [
    { name: 'CSE', attendance: 88, averageMarks: 74 },
    { name: 'IT', attendance: 82, averageMarks: 79 },
    { name: 'ECE', attendance: 76, averageMarks: 71 },
    { name: 'EEE', attendance: 69, averageMarks: 65 },
    { name: 'MECH', attendance: 73, averageMarks: 70 },
  ];

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center text-primary fw-bold">🏫 HOD Dashboard</h2>

      {/* Topic Reports */}
      <section className="mb-5">
        <h5 className="text-success">📄 Faculty Topic Coverage Reports</h5>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover table-bordered mt-3">
              <thead className="table-dark">
                <tr>
                  <th>Faculty</th>
                  <th>Subject</th>
                  <th>Topic</th>
                  <th>Proof</th>
                </tr>
              </thead>
              <tbody>
                {topicReports.length > 0 ? (
                  topicReports.map((report) => (
                    <tr key={report._id}>
                      <td>{report.facultyName || 'N/A'}</td>
                      <td>{report.subject}</td>
                      <td>{report.topic}</td>
                      <td>
                        {report.proofUrl ? (
                          <a href={report.proofUrl} target="_blank" rel="noreferrer">View</a>
                        ) : (
                          'No Proof'
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted">No topic reports found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Broadcast Notice */}
      <section className="mb-5">
        <h5 className="text-info">📢 Broadcast Notice</h5>
        <div className="d-flex gap-2 mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter notice to send to all faculty/students"
            value={notices}
            onChange={(e) => setNotices(e.target.value)}
          />
          <button className="btn btn-warning" onClick={handleNoticeSend}>Send</button>
        </div>
      </section>

      {/* 📊 Student Analytics */}
      <section className="mb-5">
        <h5 className="text-danger">📊 Student Analytics</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={progressData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendance" fill="#8884d8" name="Avg Attendance (%)" />
            <Bar dataKey="averageMarks" fill="#82ca9d" name="Avg Marks (%)" />
          </BarChart>
        </ResponsiveContainer>
      </section>
    </div>
  );
};

export default HODDashboard;

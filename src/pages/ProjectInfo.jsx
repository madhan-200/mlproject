import React from 'react';

const ProjectInfo = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 animate__animated animate__fadeInDown">📘 Project Information</h2>

      <div className="card shadow p-4 bg-light animate__animated animate__fadeInUp">
        <div className="mb-4">
          <h5 className="text-primary">🎯 Project Title</h5>
          <p className="fw-semibold">Smart Campus Communication Portal</p>
        </div>

        <div className="mb-4">
          <h5 className="text-primary">📝 Project Description</h5>
          <p>
            A centralized communication portal for students, faculty, HODs, mentors, and drivers to coordinate
            effectively using real-time attendance correction, material uploads, pickup requests, and task monitoring.
          </p>
        </div>

        <div className="mb-4">
          <h5 className="text-primary">👨‍💻 Team Members</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">🎨 Jayatchana Aravind M – Frontend Developer</li>
            <li className="list-group-item">🧪 Madhankumar S – Project Coordination & Testing</li>
            <li className="list-group-item">🛠️ Manikandan G – Backend Developer</li>
          </ul>
        </div>

        <div className="mb-4">
          <h5 className="text-primary">👨‍🏫 Project Guide</h5>
          <p>Dr. Annyce Davis</p>
        </div>

        <div>
          <h5 className="text-primary">👨‍💼 Expert Reviewer</h5>
          <p>Prof. Ravi Kumar (Industry Expert)</p>
        </div>
      </div>

      {/* Animation Styles */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
      />
    </div>
  );
};

export default ProjectInfo;

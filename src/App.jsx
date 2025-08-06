import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Public Pages
import Splash from './pages/Splash';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProjectInfo from './pages/ProjectInfo';

// Dashboards
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import HODDashboard from './pages/HODDashboard';
import MentorDashboard from './pages/MentorDashboard';
import DriverDashboard from './pages/DriverDashboard';

// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/project-info" element={<ProjectInfo />} />

        {/* Protected Routes */}
        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/faculty-dashboard"
          element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hod-dashboard"
          element={
            <ProtectedRoute allowedRoles={['hod']}>
              <HODDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mentor-dashboard"
          element={
            <ProtectedRoute allowedRoles={['mentor']}>
              <MentorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver-dashboard"
          element={
            <ProtectedRoute allowedRoles={['driver']}>
              <DriverDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

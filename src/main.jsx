import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext'; // ⬅️ Add this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* ⬅️ Wrap App */}
      <App />
    </AuthProvider>
  </StrictMode>
);

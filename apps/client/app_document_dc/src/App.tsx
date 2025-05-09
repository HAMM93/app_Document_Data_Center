import {Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
// import Dashboard from './pages/Dashboard';
// import AdminPanel from './pages/AdminPanel';
// import Unauthorized from './pages/Unauthorized';

// import PrivateRoute from './routes/PrivateRoute';
// import RoleRoute from './routes/RoleRoute';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Router>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<LoginPage />} />

            {/* Ruta protegida para cualquier usuario autenticado */}
            {/* <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            /> */}

            {/* Ruta protegida SOLO para admin */}
            {/* <Route
              path="/admin"
              element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['admin']}>
                    <AdminPanel />
                  </RoleRoute>
                </PrivateRoute>
              }
            /> */}

            {/* Ruta de acceso denegado */}
            {/* <Route
              path="/unauthorized"
              element={
                <PrivateRoute>
                  <Unauthorized />
                </PrivateRoute>
              }
            /> */}
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
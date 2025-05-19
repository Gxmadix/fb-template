import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Home from './Home';
import Login from './Login';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const [user, loading] = useAuthState(auth);
  console.log('PrivateRoute - User:', user);
  console.log('PrivateRoute - Loading:', loading);
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

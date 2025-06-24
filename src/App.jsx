import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TemplateEditor from './pages/TemplateEditor';
import ForgotPassword from './pages/ForgotPassword';
import Chatbox from './components/Chatbox';
import { useEffect } from 'react';

function App() {
  const location = useLocation();

  // Save current route to session storage
  useEffect(() => {
    sessionStorage.setItem('lastRoute', location.pathname);
  }, [location]);

  return (
    <>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor/:templateId" element={<TemplateEditor />} />
        {/* Redirect to saved route or home if no match */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Chatbox />
    </>
  );
}

export default App;
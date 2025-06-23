import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TemplateEditor from './pages/TemplateEditor';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/editor/:templateId" element={<TemplateEditor />} />
    </Routes>
   
  );
}

export default App;
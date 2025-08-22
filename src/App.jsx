import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Home from './Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TemplateEditor from './pages/TemplateEditor';
import ForgotPassword from './pages/ForgotPassword';
import Chatbox from './components/Chatbox';
import TemplateEditorEcommerce from './pages/TemplateEditorEcommerce';

function App() {
  return (
    <div className="app-container">
      {/* ToastContainer for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/editor/:templateId" element={<TemplateEditor />} />
        <Route path="/ecommerce-editor/:templateId" element={<TemplateEditorEcommerce />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Chatbox />
    </div>
  );
}

export default App;
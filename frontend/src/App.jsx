// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Login from "./components/login";
import Signup from "./components/signup";
import PatientDashboard from "./components/PatientDashboard";
import PatientForm from "./components/PatientForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";


function App() {
  return (
    <div className="min-h-screen bg-white text-black transition-colors duration-300">
      <Router>
        {/* ThemeSwitcher removed */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PatientDashboard />} />
          <Route path="/patient/:id" element={<PatientForm />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

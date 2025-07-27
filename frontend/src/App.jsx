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
import { ThemeProvider } from "./components/ThemeContext";
import ThemeSwitcher from "./components/ThemeSwitcher"; // ✅ Add this if you want global switcher

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
        <Router>
          {/* Global Theme Switcher (optional) */}
          <div className="absolute top-4 right-4 z-50">
            <ThemeSwitcher />
          </div>

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
    </ThemeProvider>
  );
}

export default App;

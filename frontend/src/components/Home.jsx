import { Link } from "react-router-dom";
import ThemeSwitcher from './ThemeSwitcher';

function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans">
      {/* Theme Switcher Top Right */}
      <div className="absolute top-0 right-0 p-6 z-20">
        <ThemeSwitcher />
      </div>
      {/* Background Image */}
      <img
        src="/images/doctor.jpg"
        alt="Doctor"
        className="absolute inset-0 w-full h-full object-cover brightness-60 dark:brightness-30"
      />
      {/* Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-indigo-800/40 to-emerald-700/40 backdrop-blur-[2px] dark:from-black/80 dark:to-gray-900/80"></div>
      {/* Hero Card */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
        <div className="bg-white/30 dark:bg-gray-900/60 rounded-3xl shadow-2xl p-10 md:p-16 max-w-2xl mx-auto backdrop-blur-[6px] border border-white/30 dark:border-gray-700/60">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 drop-shadow-lg animate-fade-in">
            Doctor Record Management
          </h1>
          <p className="text-lg md:text-xl mb-2 text-gray-800 dark:text-gray-200 font-medium drop-shadow animate-fade-in delay-100">
            Empowering doctors to securely manage their patient records with ease and efficiency.
          </p>
          <p className="text-lg md:text-xl mb-8 text-gray-700 dark:text-gray-300 animate-fade-in delay-200">Anytime. Anywhere.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in delay-300">
            <Link to="/login">
              <button className="px-8 py-3 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 text-white hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-emerald-700">
                <span className="inline-flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>Login</span>
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-8 py-3 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 text-white hover:scale-105 hover:shadow-2xl hover:from-emerald-600 hover:to-indigo-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-blue-700">
                <span className="inline-flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>Sign Up</span>
              </button>
            </Link>
          </div>
        </div>
        {/* Wavy SVG Divider */}
        <svg className="absolute bottom-0 left-0 w-full h-16" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="url(#wave-gradient)" fillOpacity="0.5" d="M0,224L48,197.3C96,171,192,117,288,117.3C384,117,480,171,576,197.3C672,224,768,224,864,197.3C960,171,1056,117,1152,117.3C1248,117,1344,171,1392,197.3L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" /><defs><linearGradient id="wave-gradient" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#2563eb" /><stop offset="0.5" stopColor="#6366f1" /><stop offset="1" stopColor="#10b981" /></linearGradient></defs></svg>
      </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s forwards;
        }
        .animate-fade-in.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in.delay-200 { animation-delay: 0.2s; }
        .animate-fade-in.delay-300 { animation-delay: 0.3s; }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Home;

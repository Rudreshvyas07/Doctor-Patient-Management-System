import { Link } from "react-router-dom";
import ThemeSwitcher from './ThemeSwitcher';

function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans bg-[#f4f8fb] dark:bg-[#101624] transition-colors duration-500">
      {/* Subtle Background Gradient */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-gradient-to-br from-[#e3f0fa] to-[#f4f8fb] dark:from-[#101624] dark:to-[#1a2236] opacity-80" />
      </div>
      {/* Theme Switcher Top Right */}
      <div className="absolute top-0 right-0 p-6 z-20">
        <ThemeSwitcher />
      </div>
      {/* Hero Card */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] text-center px-4 pt-24 md:pt-32">
        <div className="bg-white dark:bg-[#18223a] rounded-3xl shadow-xl p-10 md:p-16 max-w-2xl mx-auto border border-[#e0e7ef] dark:border-[#232e4a]">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-[#2563eb] dark:text-[#38bdf8] tracking-tight drop-shadow animate-fade-in">
            Doctor Record Management
          </h1>
          <p className="text-base md:text-lg mb-2 text-[#334155] dark:text-[#cbd5e1] font-medium animate-fade-in delay-100">
            Empowering doctors to securely manage their patient records with ease and efficiency.
          </p>
          <p className="text-base md:text-lg mb-8 text-[#64748b] dark:text-[#94a3b8] animate-fade-in delay-200">Anytime. Anywhere.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in delay-300">
            <Link to="/login">
              <button className="px-8 py-3 rounded-xl font-bold text-lg shadow-md bg-[#2563eb] hover:bg-[#174ea6] text-black hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#93c5fd] dark:focus:ring-[#38bdf8]">
                <span className="inline-flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>Login</span>
              </button>
            </Link>
            <Link to="/signup">
              <button className="px-8 py-3 rounded-xl font-bold text-lg shadow-md bg-[#10b981] hover:bg-[#047857] text-black hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] dark:focus:ring-[#38bdf8]">
                <span className="inline-flex items-center gap-2"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></svg>Sign Up</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Features Section */}
      <section className="relative z-10 max-w-5xl mx-auto mt-12 mb-20 px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-[#18223a] rounded-2xl shadow-md p-7 flex flex-col items-center text-center border border-[#e0e7ef] dark:border-[#232e4a] hover:shadow-lg transition-shadow duration-200">
          <svg className="w-12 h-12 mb-3 text-[#2563eb]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          <h3 className="font-bold text-lg mb-2 text-[#2563eb] dark:text-[#38bdf8]">Real-Time Access</h3>
          <p className="text-[#64748b] dark:text-[#cbd5e1] text-sm">Access patient records instantly, from anywhere, on any device.</p>
        </div>
        <div className="bg-white dark:bg-[#18223a] rounded-2xl shadow-md p-7 flex flex-col items-center text-center border border-[#e0e7ef] dark:border-[#232e4a] hover:shadow-lg transition-shadow duration-200">
          <svg className="w-12 h-12 mb-3 text-[#10b981]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M5 13l4 4L19 7"/></svg>
          <h3 className="font-bold text-lg mb-2 text-[#10b981] dark:text-[#6ee7b7]">Secure & Private</h3>
          <p className="text-[#64748b] dark:text-[#cbd5e1] text-sm">Your data is encrypted and protected with industry best practices.</p>
        </div>
        <div className="bg-white dark:bg-[#18223a] rounded-2xl shadow-md p-7 flex flex-col items-center text-center border border-[#e0e7ef] dark:border-[#232e4a] hover:shadow-lg transition-shadow duration-200">
          <svg className="w-12 h-12 mb-3 text-[#0ea5e9]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M9 17v-2a4 4 0 014-4h3a4 4 0 014 4v2"/></svg>
          <h3 className="font-bold text-lg mb-2 text-[#0ea5e9] dark:text-[#38bdf8]">Collaboration</h3>
          <p className="text-[#64748b] dark:text-[#cbd5e1] text-sm">Easily collaborate with your team for better patient outcomes.</p>
        </div>
      </section>
      {/* Footer */}
      <footer className="relative z-10 w-full py-6 bg-[#f1f5f9] dark:bg-[#18223a] text-[#64748b] dark:text-[#cbd5e1] text-center border-t border-[#e0e7ef] dark:border-[#232e4a]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 gap-2">
          <span className="text-sm">&copy; {new Date().getFullYear()} Doctor Record Management. All rights reserved.</span>
          <span className="text-xs">Made with <span className="text-[#ef4444]">♥</span> for healthcare professionals.</span>
        </div>
      </footer>
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

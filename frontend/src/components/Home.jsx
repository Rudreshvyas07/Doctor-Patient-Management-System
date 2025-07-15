import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/doctor.jpg"
        alt="Doctor"
        className="absolute inset-0 w-full h-full object-cover brightness-50"
      />

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center text-white px-4">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow">
          Doctor Record Management
        </h1>
        <p className="text-lg mb-2 drop-shadow">
          Empowering doctors to securely manage their patient records with ease
          and efficiency.
        </p>
        <p className="text-lg mb-6 drop-shadow">Anytime. Anywhere.</p>

        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-blue-600 text-black px-6 py-2 rounded shadow hover:bg-blue-700 transition">
              Login
            </button>
          </Link>
          <Link to="/signup">
            <button className="bg-green-600 text-black px-6 py-2 rounded shadow hover:bg-green-700 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

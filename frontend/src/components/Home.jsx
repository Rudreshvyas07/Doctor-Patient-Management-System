import { useMemo, useState } from "react";
import React from 'react';
import { Link } from "react-router-dom";
import { Heading1, LogIn, UserPlus } from "lucide-react"; // ✅ New icons
import logo from "../assets/med-logo.svg";
import Doctorimage from '../assets/doctor.png';
import { Facebook, Twitter, Linkedin } from 'lucide-react';


const FeatureCard = ({ icon, title, desc, color }) => (
  <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 text-center transform hover:-translate-y-1 animate-fade-up">
    <div className={`text-4xl mb-3 ${color}`}>{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

const faqs = [
  {
    question: "How can I make an Appointment?",
    answer:
      "To make an appointment, contact our office by phone or use our online scheduling system. Choose your date and time, and we'll confirm it promptly.",
  },
  {
    question: "Are Consultants available 24 hours at Medicare Hospital?",
    answer:
      "Yes, our consultants are available 24/7 to assist you in any medical situation.",
  },
  {
    question: "Can I get a weekend appointment?",
    answer:
      "Weekend appointments are available. Please check availability online or call us.",
  },
  {
    question: "Does Medicare Hospital Provide Emergency Services?",
    answer:
      "Yes, we provide 24/7 emergency medical services for all urgent care needs.",
  },
  {
    question: "Can I reschedule or cancel my appointment?",
    answer:
      "You can reschedule or cancel by contacting us at least 24 hours in advance.",
  },
  {
    question: "How can I access my medical records?",
    answer:
      "Medical records can be accessed through our secure patient portal after logging in.",
  },
];

const blogs = [
  {
    title: "Expert Health Insights",
    date: "18 March 2024",
    description:
      "Discover trusted medical knowledge and expert advice to help you lead a healthier, more informed life—every step of the way.",
  },
  {
    title: "Wellness That Empowers",
    date: "18 March 2024",
    description:
      "From prevention to treatment, explore articles that guide you to take charge of your health with clarity and confidence.",
  },
  {
    title: "Your Health, Our Priority",
    date: "18 March 2024",
    description:
      "Stay ahead with curated tips, medical updates, and wellness guidance designed to support your everyday well-being.",
  },
  {
    title: "Smarter Choices for Better Health",
    date: "18 March 2024",
    description:
      "Make informed health decisions with reliable insights, practical advice, and the latest healthcare trends all in one place.",
  },
];
function Home() {
  const features = useMemo(() => [
    {
      icon: "💡",
      title: "Real-Time Access",
      desc: "Access patient records instantly, from any device securely.",
      color: "text-sky-500"
    },
    {
      icon: "🔐",
      title: "Secure & Private",
      desc: "All data is encrypted using industry standards.",
      color: "text-teal-600"
    },
    {
      icon: "🤝",
      title: "Collaborative Tools",
      desc: "Built-in features for teamwork & better outcomes.",
      color: "text-cyan-600"
    }
  ], []);

  const services = useMemo(() => [
  {
    title: 'Cardiology',
    description: 'Tortor posuere ac ut consequat semper viverra nam. Orci ac auctor augue mauris augue neque gravida in.',
    icon: '🫀',
    link: 'https://en.wikipedia.org/wiki/Cardiology',
    active: true,
  },
  {
    title: 'Neurology',
    description: 'Tortor posuere ac ut consequat semper viverra nam. Orci ac auctor augue mauris augue neque gravida in.',
    icon: '🧠',
    link: 'https://en.wikipedia.org/wiki/Neurology',
    active: true, 
  },
  {
    title: 'Radiology',
    description: 'Tortor posuere ac ut consequat semper viverra nam. Orci ac auctor augue mauris augue neque gravida in.',
    icon: '🩻',
    link: 'https://en.wikipedia.org/wiki/Radiology',
    active: true,
  },
  {
    title: 'Pulmonary',
    description: 'Tortor posuere ac ut consequat semper viverra nam. Orci ac auctor augue mauris augue neque gravida in.',
    icon: '🫁',
    link: 'https://en.wikipedia.org/wiki/Pulmonology',
    active: true,
  },
], []);

  return (
    <div className="relative min-h-screen w-full font-inter bg-[#f9fafb] text-gray-900 transition-colors duration-500 overflow-x-hidden">

     {/* Top Navbar */}
<nav className="bg-transparent absolute top-5  left-0 w-full z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-16">

      {/* Logo */}
      <div className="flex-shrink-0">
        <Link >
          <img src={logo} alt="MediCare Logo" className="w-36 h-auto" />
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-8 items-center">
        <Link to="/" className="text-gray-700 hover:text-teal-600 font-medium">
          Home
        </Link>
        <Link to="/services" className="text-gray-700 hover:text-teal-600 font-medium">
          Services
        </Link>
        <Link to="/about" className="text-gray-700 hover:text-teal-600 font-medium">
          About Us
        </Link>
        <Link
          to="/signup"
        >
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-base font-medium bg-teal-500 hover:bg-teal-600 text-white shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <UserPlus size={20} />
            Sign Up
          </button>
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        {/* Optional: Add a toggle menu if you want to support mobile menu */}
        <button className="text-gray-700 focus:outline-none">
          {/* Hamburger Icon */}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

    </div>
  </div>
</nav>

      

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center px-6 pt-32 md:pt-36 ">
         {/* Background Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl animate-blob-1" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-teal-300/20 rounded-full blur-2xl animate-blob-2" />
        <div className="absolute top-1/3 left-1/3 w-30 h-30 bg-cyan-300/30 rounded-full blur-2xl animate-blob-3" />
      </div>
      
        <div className="bg-white/60 backdrop-blur-2xl rounded-2xl shadow-xl p-10 md:p-16 max-w-3xl mx-auto border border-white/20 animate-fade-down">
          <h1 className="text-5xl font-bold mb-6 tracking-tight text-sky-600">
            MediCare Health Records
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-700 mb-3">
            Empowering doctors to securely manage patient records with speed and confidence.
          </p>
          <p className="text-base text-gray-500 mb-8">
            Access from anywhere. Anytime.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/login">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-base font-medium bg-sky-500 hover:bg-sky-600 text-white shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400"
              >
                <LogIn size={20} />
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-base font-medium bg-teal-500 hover:bg-teal-600 text-white shadow-md transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400"
              >
                <UserPlus size={20} />
                Sign Up
              </button>
            </Link>
          </div>
        </div>
        {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto mt-20 mb-24 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </section>
      </section>

      
    <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      
       {/* Background Blobs */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl animate-blob-1" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-teal-300/20 rounded-full blur-2xl animate-blob-2" />
        <div className="absolute top-1/3 left-1/3 w-30 h-30 bg-cyan-300/30 rounded-full blur-2xl animate-blob-3" />
      </div>
      
      {/* Left: Image Section */}
      <div className="relative">
        <div className="absolute top-4 left-4 w-full h-full rounded-xl -z-10" />
        <img
          src={Doctorimage}
          alt="Doctors_image"

        />
      </div>

      {/* Right: Text Content */}
      <div>
        <span className="bg-teal-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
          About Medicare
        </span>

        <h1 className="text-4xl font-bold mt-4 leading-tight">
          Your Health Requirement<br />
          Is our First <span className="text-teal-600">Focus.</span>
        </h1>

        <p className="text-white-500 mt-4">
          Continually My coordinate collaborative action items for next-generation Customer service.
          Professionally disseminate team-driven processes.
        </p>

        <ul className="mt-6 space-y-5 text-gray-100">
          <li>
            <span className="font-semibold">Advanced Anesthesia Care</span><br />
            <span className="text-sm text-gray-700">
              Get expert anesthesiology support and consultations from the comfort of your home—safe, simple, and stress-free.
            </span>
          </li>
          <li>
            <span className="font-semibold">Full-Body & Neurological Testing</span><br />
            <span className="text-sm text-gray-700">
             Seamless access to skin, head, and full-body testing through virtual care. Clear results, faster diagnoses.
            </span>
          </li>
          <li>
            <span className="font-semibold"> Immune System Support & Antibody Services</span><br />
            <span className="text-sm text-gray-700">
              Specialized consultations for antibody-related concerns, helping you stay informed and protected.
            </span>
          </li>
        </ul>

        <button className="mt-6 bg-teal-700 text-white px-6 py-3 rounded-full hover:bg-teal-800 transition-transform duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-400">
          Discover more
        </button>
        
      </div>
    </div>
  <section className=" bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Background Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Blob Top Right */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl animate-blob-1" />
          {/* Blob Bottom Left */}
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-teal-300/20 rounded-full blur-2xl animate-blob-2" />
          {/* Blob Center Right */}
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-cyan-300/30 rounded-full blur-xl animate-blob-3 transform -translate-y-1/2" />
        </div>
        <span className="bg-teal-700 text-teal-00 px-3 py-1 rounded-full text-sm font-semibold">
          Our Services
        </span>
        <h1 className="text-3xl md:text-4xl font-bold mb-12 mt-8">
          Find Our Different Services<br />For Your Whole Family
        </h1>

        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Link
              to={service.link}
              key={index}
              className={`transition-all rounded-xl p-6 text-left shadow-sm hover:shadow-md hover:scale-[1.02]
                ${
                  service.active
                    ? ' dark:bg-[#1e293b] text-white '
                    : ' dark:bg-[#1e293b] text-white '
                }
              `}
            >
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-200 rounded-full flex items-center justify-center text-2xl mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg text-white font-bold mb-2">{service.title}</h3>
              <p className="text-sm text-white leading-relaxed">
                {service.description}
              </p>
              {service.active && (
                <span className="mt-4 inline-block text-sm text-teal-200 font-medium">
                  View Details →
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
</section>

{/* FAQ Section */}
<FAQSection />

<BlogSection blogs={blogs} />


<style>{`
      .animate-fade-in {
        opacity: 0;
        animation: fadeIn 1s forwards;
      }
      .animate-fade-in.delay-100 { animation-delay: 0.1s; }
      .animate-fade-in.delay-200 { animation-delay: 0.2s; }
      .animate-fade-in.delay-300 { animation-delay: 0.3s; }
      .animate-fade-in.delay-400 { animation-delay: 0.4s; }

      @keyframes fadeIn {
        to { opacity: 1; }
      }

      @keyframes blobSlow {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(30px, -20px) scale(1.1); }
      }

      @keyframes pulseSlow {
        0%, 100% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.05); opacity: 0.5; }
      }

      .animate-blob-slow {
        animation: blobSlow 10s infinite;
      }

      .animate-pulse-slow {
        animation: pulseSlow 8s infinite;
      }

      @keyframes pulseSlow {
        0%, 100% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.05); opacity: 0.5; }
      }

      .animate-blob-slow {
        animation: blobSlow 10s infinite;
      }

      .animate-pulse-slow {
        animation: pulseSlow 8s infinite;
      }

    `}</style>

      {/* Footer */}
    
    <footer className="bg-[#012A2F] text-white py-12 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-sm">
        {/* Logo + Description */}
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Medicare</h2>
          <p className="text-gray-300 mb-4">
            We provide all aspects of medical practice for your whole family, including general check-ups. We will work with you to develop individualized care plans, including diseases.
          </p>
          <div className="flex items-center space-x-4 mt-4">
            <a href="#" className="hover:text-teal-400 transition">
              <Linkedin size={20} />
            </a>
            <a href="#" className="hover:text-teal-400 transition">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-teal-400 transition">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">About us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">News & Media</a></li>
            <li><a href="#" className="hover:text-white">Contact Us</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Departments */}
        <div>
          <h3 className="font-semibold mb-3">Departments</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">General Medicine</a></li>
            <li><a href="#" className="hover:text-white">Cardiology</a></li>
            <li><a href="#" className="hover:text-white">Neurology</a></li>
            <li><a href="#" className="hover:text-white">Pediatrics</a></li>
            <li><a href="#" className="hover:text-white">Orthopedics</a></li>
            <li><a href="#" className="hover:text-white">Emergency care</a></li>
          </ul>
        </div>

        {/* Patient Services */}
        <div>
          <h3 className="font-semibold mb-3">Patient Services</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">Appointment Booking</a></li>
            <li><a href="#" className="hover:text-white">Health Check Packages</a></li>
            <li><a href="#" className="hover:text-white">Online Reports</a></li>
            <li><a href="#" className="hover:text-white">Insurance Support</a></li>
            <li><a href="#" className="hover:text-white">Patient Portal</a></li>
            <li><a href="#" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-white">Book An Appointment</a></li>
            <li><a href="#" className="hover:text-white">View Gallery</a></li>
            <li><a href="#" className="hover:text-white">Testimonials</a></li>
            <li><a href="#" className="hover:text-white">Medical Articles</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-600 mt-10 pt-6 text-center text-gray-400 text-sm">
        © Medicare Center 2024. All rights reserved.
        <span className="block sm:inline sm:ml-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
        </span>
      </div>
    </footer>

    </div>
    
  );
}


/* FAQItem component */
function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-lg shadow p-5 border border-gray-200 dark:border-slate-700 transition-all">
      <button
        className="w-full flex justify-between items-center text-left font-semibold text-lg text-white  focus:outline-none"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        {question}
        <span className="ml-4 text-white ">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 dark:text-slate-300 text-base">
          {answer}
        </div>
      )}
    </div>
  );
}

/* FAQSection component */
function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="max-w-6xl mx-auto px-6 py-20 relative z-10">
      <div className="text-center mb-12">
        <span className="bg-teal-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Our FAQs
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4">
          Questions? We're Glad You <span className="text-teal-600">Asked.</span>
        </h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
          Quick answers to common questions. Can’t find what you’re looking for?
        </p>
      </div>

      <div className="grid gap-5">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            {...faq}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </section>
  );
}

function BlogCard({ title, date, description }) {
  return (
    <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-lg p-6 border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="text-left">
        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
        <p className="text-sm text-teal-600 dark:text-teal-400 mb-3">{date}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{description}</p>
        <button className="mt-4 text-teal-600 dark:text-teal-400 text-sm font-medium hover:text-teal-700 dark:hover:text-teal-300 transition-colors">
          Read More →
        </button>
      </div>
    </div>
  );
}

function BlogSection({ blogs }) {
  return (
    <section className="bg-[#f9fafb]  py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <span className="bg-teal-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
          Our Blog
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-8">
          Latest Medical <span className="text-teal-600">Insights</span>
        </h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;

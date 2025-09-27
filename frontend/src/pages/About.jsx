import React from 'react';
import { Home as HomeIcon } from 'lucide-react'; // icono de casa

const About = () => {
  const handleScrollToHome = () => {
    const homeSection = document.getElementById('home');
    if (homeSection) {
      homeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="min-h-screen bg-gray-50 px-8 py-20">
      <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">
        About This Project
      </h2>

      <div className="max-w-4xl mx-auto space-y-6 text-gray-700">
        <p>
          This project is designed to check whether a product is legal, illegal,
          or requires special permits in Switzerland.
        </p>

        <h3 className="text-2xl font-semibold mt-4">Development Process</h3>

        <h3 className="text-2xl font-semibold mt-4">Approach</h3>

        <h3 className="text-2xl font-semibold mt-4">Technologies Used</h3>
      </div>
      <div className="flex justify-center mt-12">
        <button
          className="flex items-center px-6 py-3 bg-primary text-white border-2 border-primary 
                     hover:bg-white hover:text-primary transition-colors duration-300 rounded-full shadow-lg"
          onClick={handleScrollToHome}
        >
          <HomeIcon size={24} className="mr-2" />
          Home
        </button>
      </div>
    </section>
  );
};

export default About;

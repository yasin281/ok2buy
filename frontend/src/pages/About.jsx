import React from 'react';
import { Home as HomeIcon } from 'lucide-react';
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
          This solution is designed to assist shoppers and retailers in the process of acquiring and importing products from international suppliers, which aren't necessarily selling approved products under the local regulations.
          The main goal of this project is to demonstrate a proof of concept for the Federal Office of Customs and Border Security (FOCBS) to classify products based on their legality under Swiss Law using AI. More info about the challenge can be found clicking on the following image.
          <br />
          <a href="https://zh.swiss-ai-weeks.ch/challenges/swissgov3" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            <img src="challenge.png" alt="Challenge" className="mx-auto my-6 cursor-pointer hover:opacity-80 transition-opacity duration-300 shadow-md rounded-lg" />
          </a>          
        </p>

        <h3 className="text-2xl font-semibold mt-4">Requirements</h3>
        <p>
          The challenge stated the following requirements:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Use a <b>product ID</b> as input for the platform.</li>
            <li>The classification should be made with <b>publicly available information</b> and <b>Swiss guidelines</b></li>
            <li>The platform shouldn't <b>violate ToS</b> of the ecommerce platform</li>
            <li>The platform should provide a <b>reasoning</b> for the classification.</li>
            <li>The platform should have a <b>web interface</b> and an <b>API gateway</b>.</li>
            <li>The platform should be licensed under <b>MIT license</b>.</li>
          </ul>
        </p>
        <h3 className="text-2xl font-semibold mt-4">Proposed Approach</h3>
        <p>
          Taking into account the requirements, we planned to use the following approach:
          <br />

          <img src="approach.png" alt="Proposed Approach" className="mx-auto my-6" />
          <div className="my-6">
            <details className="bg-white rounded-lg shadow p-4">
              <summary className="cursor-pointer font-semibold text-lg">Explanation</summary>
              <div className="mt-3 text-gray-700">
                <p>
                  Our first approach started with an API controller, which also is used by the Web Gateway to query the backend. When the backend receives a product ID, it would check a cache server to see if it was already classified. If yes, it would've returned the legality of a product. If not, it would first get the product information from the ecommerce platform via API or Scraping, and then get the relevant laws for that category of product. These laws are obtained from official sources such as TARES or Passar.
                </p>
                <br />
                <p>
                  Once gathered the necessary info, we then proceed to call Apertus to analyze the product information and the laws to determine if such product is legal under Swiss Law, and the answer is returned via the API Gateway
                </p>
              </div>
            </details>
          </div>

        </p>
        <h3 className="text-2xl font-semibold mt-4">Technical Limitations</h3>
        <p>
          During the development of this project, we encountered several technical limitations that influenced our approach:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><b>Limited access</b> to certain product data due to API restrictions.</li>
            <li><b>Ecommerce ToS compliance</b> limited our ability to scrape data from the websites without breaching said terms. Both platforms <b>require being preauthorized</b> by them to be able to retrieve information, which due to time constraints we were unable to obtain.</li>
            <div className="flex flex-col items-center space-y-4"> 
              <img src="tos-temu.png" alt="Temu ToS" className="w-7/8 h-auto rounded-lg shadow-md" />
              <img src="tos-shein.png" alt="Shein ToS" className="w-7/8 h-auto rounded-lg shadow-md" />
            </div>
            <li><b>Vector DBs</b> wouldn't correctly categorize the product information, thus returning irrelevant results.</li>
            <li>AI models may not always return <b>data in the correct format</b></li>
          </ul>
          <br />
          Due to that, we had to adapt our approach to a simpler version that only demonstrates the <b>core functionality</b> of the product classification using AI.
        </p>
        <h3 className="text-2xl font-semibold mt-4">Current Implementation</h3>
        <p>
          Our current implementation focuses on the core functionality of product classification using AI. We have developed a streamlined version of the system that demonstrates the key features while working within the identified technical limitations.
          The implementation is as follows:
          
          <ul className="list-decimal list-inside mt-2 space-y-1">
            <li>The user inputs a <b>product ID</b> through the web interface. Also accepts <b>GET requests</b> to the API Gateway.</li>
            <li>The system retrieves <b>product information</b> from an existent set of product information (GitHub dataset)</li>
            <li>The system sanitizes the information so that only <b>relevant information</b> for classification is retained.</li>
            <li>The sanitized product information is sent to the <b>AI model (Apertus)</b> along with categories to get relevant categories for such product</li>
            <li>The AI model now processes the <b>relevant laws</b> of that category and the <b>product information</b> to determine its legality, and also provide a reasoning for that decision</li>
            <li>The output is handled so it can be presented to the API gateway in a structured format</li>
            <li>If the request is initiated through the Web UI, the user receives the classification result <b>directly on the interface.</b></li>
          </ul>
        </p>
        <h3 className="text-2xl font-semibold mt-4">Tech Stack</h3>
        <p>
          The tech stack used for this project includes:
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Frontend: <b>React</b>, TailwindCSS, Lucide Icons</li>
            <li>Backend: <b>Python</b>, FastAPI, Uvicorn</li>
            <li>AI Model: <b>Apertus</b> over Swisscom inference platform</li>
            <li>LLM Requests: <b>OpenAI API</b></li>
            <li>Hosting: <b>Render</b></li>
          </ul>
        </p>
        <h3 className="text-2xl font-semibold mt-4">Future Work</h3>
        <p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Integrate <b>real-time product data retrieval</b> from ecommerce platforms while ensuring compliance with their ToS.</li>
            <li>Enhance the <b>AI model's</b> accuracy, reliability and speed through continuous training and fine-tuning.</li>
            <li>Implement a robust <b>caching mechanism</b> to store previously classified products for faster response times.</li>
            <li>Expand the database of laws and regulations to cover a wider range of product categories and jurisdictions.</li>
            <li>Containerize the application using Docker for easier deployment and scalability.</li>
          </ul>
        </p>

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

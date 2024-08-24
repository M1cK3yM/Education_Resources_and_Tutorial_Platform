import React from 'react';

function AboutPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8">About Our Platform</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-black shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Comprehensive University Information</h2>
          <p className="mb-4">
            Our platform provides detailed and up-to-date information about various universities in Ethiopia. You can explore the background, academic focus, and key details of these institutions to help you make an informed decision about your higher education.
          </p>
        </div>

        <div className="bg-black shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Empowering Student Choices</h2>
          <p className="mb-4">
            Our mission is to empower students like you to make the best choices for your academic and career goals. By offering comprehensive information about universities, we aim to help you navigate the higher education landscape in Ethiopia and find the institution that aligns with your aspirations.
          </p>
        </div>

        <div className="bg-black shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Connecting with Universities</h2>
          <p className="mb-4">
            In addition to providing information, we also facilitate connections between students and universities. You can explore various programs, admission requirements, and connect directly with university representatives through our platform.
          </p>
        </div>

        <div className="bg-black shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Continuous Updates and Improvements</h2>
          <p className="mb-4">
            We are committed to continuously updating and improving our platform to ensure you have access to the latest and most accurate information about Ethiopian universities. Our team works diligently to keep the content fresh and relevant.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
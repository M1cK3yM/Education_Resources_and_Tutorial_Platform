import React from 'react';

function AboutPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold mb-8">Our Platform's main goal</h1>

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-black shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4"> Gives Information about University</h2>
          <p className="mb-4">
            This website provides detailed information about various universities in Ethiopia. The content covers the background, academic focus, and key details of these institutions.
          </p>
         
        </div>

        
      </div>
    </div>
  );
}

export default AboutPage;
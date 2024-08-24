import React from 'react';
import ResourceCard from '../components/ResourceCard';

function ResourcePage() {
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-64 md:h-96 lg:h-[500px]"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1561469371-48cd0acc9ba9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')", // Modern education and technology background image
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            Educational Resources
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl">
            Explore a wealth of educational resources
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Featured Resources</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Updated Resource Cards */}
          <ResourceCard
            title="Digital Learning Platforms"
            description="Explore platforms that offer online courses, tutorials, and certifications."
            imageUrl="\src\assets\images\images.jpg"
            detailsUrl="/resources/digital-learning-platforms"
          />
          <ResourceCard
            title="E-books and Journals"
            description="Access a variety of e-books and academic journals on different subjects."
            imageUrl="https://images.unsplash.com/photo-1593642532973-d31b6557fa68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNTE5N3wwfDF8c2VhcmNofDh8fGVib29rc3x8MHx8fHwxNjM0OTQ5MDQw&ixlib=rb-1.2.1&q=80&w=400"
            detailsUrl="/resources/e-books-and-journals"
          />
          <ResourceCard
            title="Coding and Development"
            description="Learn to code with interactive tutorials, exercises, and challenges."
            imageUrl="\src\assets\images\learn-coding-online-for-free.webp"
            detailsUrl="/resources/coding-and-development"
          />
          <ResourceCard
            title="Tech News and Updates"
            description="Stay updated with the latest trends and innovations in technology."
            imageUrl="\src\assets\images\Google_Career_Cert.width-560.format-webp.webpquality-95_d4Y1FgQ.webp"
            detailsUrl="/resources/tech-news-updates"
          />
        </div>
      </div>
    </div>
  );
}

export default ResourcePage;

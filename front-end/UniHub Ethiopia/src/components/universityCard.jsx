import React from 'react';

function ResourceCard({ title, description, imageUrl, detailsUrl }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 text-base mb-4">{description}</p>
        <a href={detailsUrl} className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus-shadow-outline">
          Learn More
        </a>
      </div>
    </div>
  );
}

export default ResourceCard;
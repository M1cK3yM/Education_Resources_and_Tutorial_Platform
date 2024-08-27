import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function LearnMorePage() {
  const { resourceId } = useParams(); // Use useParams to get the resource ID from the URL
  const [resource, setResource] = useState(null);

  useEffect(() => {
    // Simulate fetching resource data from an API or database
    const fetchResource = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/resources/${resourceId}`);
        const data = await response.json();
        setResource(data);
      } catch (error) {
        console.error('Error fetching resource:', error);
      }
    };

    fetchResource();
  }, [resourceId]);

  if (!resource) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{resource.title}</h1>
      <img src={resource.imageUrl} alt={resource.title} className="w-full h-auto mb-4" />
      <p className="text-lg mb-4">{resource.description}</p>
      <div>
        <p>Additional information about the resource goes here...</p>
      </div>
    </div>
  );
}

export default LearnMorePage;

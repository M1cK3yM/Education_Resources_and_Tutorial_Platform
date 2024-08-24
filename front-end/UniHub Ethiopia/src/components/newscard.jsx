import React from 'react';
import { Link } from 'react-router-dom';

function NewsCard({ title, date, description, imageUrl, detailsUrl }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden my-4 md:my-8 flex flex-col md:flex-row">
      <div className="md:flex-shrink-0 md:w-1/2">
        <img
          className="h-64 w-full object-cover md:h-auto"
          src={imageUrl}
          alt={title}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {date}
          </div>
          <Link to={detailsUrl} className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">
            {title}
          </Link>
          <p className="mt-2 text-gray-500">{description}</p>
        </div>
        <div className="mt-4">
          <Link
            to={detailsUrl}
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
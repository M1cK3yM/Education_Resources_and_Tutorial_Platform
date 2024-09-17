import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Button } from "./ui/button";

function NewsCard({ title, date, description, imageUrl, detailsUrl }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-transparent text-foreground mt-2 p-6 my-2 max-w-xl w-4/5 mx-auto flex md:flex-row md:items-center transition-transform duration-500 ${
        isVisible
          ? "animate-slide-in-up animate-zoom-in"
          : "opacity-0 translate-y-4"
      } shadow-2xl`}
    >
      <div className="bg-transparent overflow-hidden my-4 md:my-8 flex flex-row">
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
            <Link
              to={detailsUrl}
              className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
            >
              {title}
            </Link>
            <p className="mt-2 text-gray-500">{description}</p>
          </div>
          <div className="mt-4">
            <Link to={detailsUrl}>
              <Button>Read More</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;

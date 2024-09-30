import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

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
    <Card
      ref={cardRef}
      className={`bg-background text-foreground mt-2 mb-4 w-full max-w-4xl mx-auto transition-all duration-500 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-4 scale-95"
      } shadow-lg hover:shadow-xl`}
    >
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-2/5 md:w-1/3">
            <img
              className="h-48 w-full object-cover sm:h-full"
              src={imageUrl}
              alt={title}
              loading="lazy"
            />
          </div>
          <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-semibold mb-2">
                {date}
              </p>
              <Link
                to={detailsUrl}
                className="block text-xl sm:text-2xl font-semibold text-foreground hover:underline mb-2"
              >
                {title}
              </Link>
              <p className="text-muted-foreground text-sm sm:text-base line-clamp-3">
                {description}
              </p>
            </div>
            <CardFooter className="px-0 pt-4">
              <Button asChild>
                <Link to={detailsUrl}>Read More</Link>
              </Button>
            </CardFooter>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default NewsCard;

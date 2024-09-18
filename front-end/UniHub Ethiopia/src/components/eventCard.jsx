import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

function EventCard({ title, date, note, imageUrl, detailsUrl }) {
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
    <Link to={detailsUrl}>
      <div
        ref={cardRef}
        className={`bg-transparent text-foreground mt-2 p-6 my-2 max-w-6xl w-4/5 mx-auto flex flex-col md:flex-row md:items-center transition-transform duration-500 ${
          isVisible
            ? "animate-slide-in-up animate-zoom-in"
            : "opacity-0 translate-y-4"
        } shadow-2xl`}
      >
        <div className="md:w-2/3 md:pr-6">
          <p className="text-sm md:text-base font-semibold">{date}</p>
          <h2 className="text-2xl md:text-3xl font-bold mt-2">{title}</h2>
          <p className="mt-2 text-sm md:text-base w-2/3">{note}</p>
          <a href={detailsUrl} className="mt-8">
            <Button className="mt-8">See Event Details</Button>
          </a>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </Link>
  );
}

export default EventCard;

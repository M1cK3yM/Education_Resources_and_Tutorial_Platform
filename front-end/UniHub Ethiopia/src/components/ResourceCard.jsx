import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";

function ResourceCard({ title, type, description, resourceUrl }) {
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
      { threshold: 0.1 },
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
      className={`bg-transparent text-foreground mt-2 p-6 my-2 max-w-6xl w-4/5 mx-auto flex flex-col md:flex-row md:items-center transition-transform duration-500 ${
        isVisible
          ? "animate-slide-in-up animate-zoom-in"
          : "opacity-0 translate-y-4"
      } shadow-2xl`}
    >
      <div className="md:w-2/3 md:pr-6">
        <h2 className="text-3xl font-bold mt-2">{title}</h2>
        <p className="text-lg font-semibold">{type}</p>
        <p className="mt-2 text-lg">{description}</p>
        <a href={resourceUrl} className="mt-8">
          <Button className="mt-8">View Resource</Button>
        </a>
      </div>
    </div>
  );
}

export default ResourceCard;


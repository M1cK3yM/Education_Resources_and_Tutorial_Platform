import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const formatSize = (sizeInBytes) => {
  if (sizeInBytes < 1024) return `${sizeInBytes} B`;
  if (sizeInBytes < 1048576) return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  return `${(sizeInBytes / 1048576).toFixed(2)} MB`;
};

function ResourceCard({
  title,
  size,
  description,
  coverImage,
  numberOfPages,
  resource,
}) {
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
      className={`flex flex-row justify-around border p-4 my-4 shadow-sm rounded-lg bg-transparent hover:shadow-lg transition-shadow duration-300${
        isVisible
          ? "animate-slide-in-up animate-zoom-in"
          : "opacity-0 translate-y-4"
      }`}
    >
      <img src={coverImage} alt={title} className="cover-image" />
      <div className="flex flex-col">
        <Link to={`/resources/${resource._id}`}>
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
        </Link>
        <div className="flex text-foreground text-sm">
          <span className="mr-4">{numberOfPages} Pages</span>
          <span>{formatSize(size)}</span>
        </div>
        <p className="mt-2 text-sm text-foreground">{description}</p>
      </div>
    </div>
  );
}

export default ResourceCard;

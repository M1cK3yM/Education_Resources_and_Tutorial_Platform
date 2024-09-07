import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

function UserCard({ name, role, email, profileImageUrl }) {
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
    <div>
      <div
        ref={cardRef}
        className={`bg-transparent text-foreground mt-2 p-6 my-2 max-w-6xl w-4/5 mx-auto flex flex-col md:flex-row md:items-center transition-transform duration-500 ${
          isVisible
            ? "animate-slide-in-up animate-zoom-in"
            : "opacity-0 translate-y-4"
        } shadow-2xl`}
      >
        <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
          <Avatar className="w-24 h-24 sm:w-24 sm:h-24 md:w-30 md:h-30 lg:w-48 lg:h-48 rounded-full shadow-lg ">
            <AvatarImage
              src={profileImageUrl}
              alt={name}
              className="object-cover"
            />
            <AvatarFallback className="text-3xl">
              {name.toUpperCase()[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="md:w-2/3 md:pr-6 mt-6 md:mt-0 md:pl-6 space-y-4">
          <h2 className="text-3xl font-bold">{name}</h2>
          <p className="text-lg font-semibold">{role}</p>
          <p className="text-lg">{email}</p>
        </div>
      </div>
    </div>
  );
}

export default UserCard;

import "../styles/event.css";
import EventCard from "../components/eventCard";
function EventsPage() {
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-64 md:h-96 lg:h-[500px]"
        style={{
          backgroundImage:
            "url('/src/assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg')",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            Educational and Resource Platform
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl">
            Empowering Students and Educators
          </p>
        </div>
      </div>

      <EventCard
        title="This is the Title of the Event"
        date="Friday, August 23, 2024"
        description="This is the description of the event that is going on for a while"
        imageUrl="/src/assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg"
        detailsUrl="See detail"
      />
      <EventCard
        title="This is the Title of the Event"
        date="Friday, August 23, 2024"
        description="This is the description of the event that is going on for a while"
        imageUrl="/src/assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg"
        detailsUrl="See detail"
      />
      <EventCard
        title="This is the Title of the Event"
        date="Friday, August 23, 2024"
        description="This is the description of the event that is going on for a while"
        imageUrl="/src/assets/images/edwin-andrade-6liebVeAfrY-unsplash.jpg"
        detailsUrl="See detail"
      />
    </div>
  );
}
export default EventsPage;

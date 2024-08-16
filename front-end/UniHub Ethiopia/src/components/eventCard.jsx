function EventCard({ title, date, description, imageUrl, detailsUrl }) {
    return (
      <div className="bg-transparent text-foreground mt-10 p-6 my-6 max-w-6xl w-4/5 mx-auto flex flex-col md:flex-row md:items-center">
        <div className="md:w-2/3  md:pr-6">
          <p className="text-lg font-semibold">{date}</p>
          <h2 className="text-3xl  font-bold mt-2">{title}</h2>
          <p className="mt-4 text-lg">{description}</p>
          <a href={detailsUrl} className="mt-8 inline-block  hover:underline font-bold">
            See Event Details
          </a>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img src={imageUrl} alt={title} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
      </div>
    );
  }
  
  export default EventCard;

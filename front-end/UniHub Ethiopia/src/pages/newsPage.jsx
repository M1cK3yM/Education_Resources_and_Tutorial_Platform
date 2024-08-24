
import NewsCard from "../components/NewsCard";

function NewsPage() {
  return (
    <div>
      <div
        className="relative bg-cover bg-center h-64 md:h-96 lg:h-[500px]"
        style={{
          backgroundImage:
            "url('')",
        }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            News and Updates
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl">
            Stay informed with the latest news and updates
          </p>
        </div>
      </div>

      <NewsCard
        title="Breaking News:"
        date="August 15, 2024"
        description="..."
        imageUrl="/src/assets/images/med-mhamdi-Ab89XuE-0Oc-unsplash.jpg"
        detailsUrl="/news/1"
      />
      <NewsCard
        title="title of the news."
        date="August 10, 2024"
        description=""
        imageUrl="/src/assets/images/med-mhamdi-Ab89XuE-0Oc-unsplash.jpg"
        detailsUrl="/news/2"
      />
      <NewsCard
        title="title of the news"
        date="August 5, 2024"
        description=""
        imageUrl="/src/assets/images/med-mhamdi-Ab89XuE-0Oc-unsplash.jpg"
        detailsUrl="/news/3"
      />
    </div>
  );
}

export default NewsPage;
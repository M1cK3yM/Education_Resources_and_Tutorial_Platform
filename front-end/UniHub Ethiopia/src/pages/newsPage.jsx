import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";

function NewsPage() {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/news");
      const data = await response.json();
      setNewsData(data);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center h-64 md:h-96 lg:h-[500px]"
        style={{
          backgroundImage: "url('')",
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

      {newsData.map((article) => (
        <NewsCard
          key={article._id}
          title={article.title}
          date={article.date}
          description={article.description}
          imageUrl={article.imageUrl}
          detailsUrl={`/news/${article.id}`}
        />
      ))}
    </div>
  );
}

export default NewsPage;

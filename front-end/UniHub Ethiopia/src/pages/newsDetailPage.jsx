import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "@/components/newscard";
import axios from "axios";
import {
  FaTelegramPlane,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

const NewsDetailPage = () => {
  const { newsId } = useParams();
  const [oneNews, setOneNews] = useState(null);
  const [news, setNews] = useState([]);
  const currentUrl = window.location.href;

  useEffect(() => {
    const fetchnewsDetails = async () => {
      try {
        const endPoint = `http://localhost:3000/api/news/${newsId}`;
        const response = await axios.get(endPoint);
        setOneNews(response.data);
        const responseData = await axios.get("http://localhost:3000/api/news");
        setNews(responseData.data);
      } catch (err) {
        console.error("Error fetching news details:", err);
      }
    };

    if (newsId) {
      fetchnewsDetails();
    }
  }, [newsId]);

  if (!oneNews) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied to clipboard. Share it on Instagram!");
  };

  return (
    <div className="text-foreground font-sans">
      <main className="container mx-auto mt-20 px-4 md:px-0">
        <div className="flex justify-around">
          <div>
            <div className="flex max-w-lg h-auto">
              <img
                src={oneNews.image}
                alt={oneNews.title}
                className="object-cover rounded mr-10"
              />
            </div>
            <div className="mt-8 text-left  mt-20 max-w-3xl">
              <h1 className="text-4xl font-bold mt-4">{oneNews.title}</h1>
            </div>
            <div>{oneNews.content}</div>
          </div>
          <div className="max-w-3xl">
            {news.map((news) => (
              <NewsCard
                key={news._id}
                title={news.title}
                content={news.content}
                image={news.image}
              />
            ))}
          </div>
        </div>
      </main>

      <section className="mt-12 py-12">
        <div className="w-1/2">
          <p className="mt-6 w-auto text-base">{oneNews.content}</p>
          <p className="mt-8 text-base">
            Help us spread the word by sharing this page!
          </p>
          <div className="my-2 flex space-x-4 overflow-visible">
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                currentUrl
              )}&text=${encodeURIComponent(oneNews.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              <FaTelegramPlane size={30} />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700"
            >
              <FaFacebook size={30} />
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                currentUrl
              )}&title=${encodeURIComponent(oneNews.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-800 hover:text-blue-900"
            >
              <FaLinkedin size={30} />
            </a>
            <button onClick={handleCopyLink} className="text-pink-600 ">
              <FaInstagram size={30} />
            </button>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentUrl
              )}&text=${encodeURIComponent(oneNews.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              <FaTwitter size={30} />
            </a>
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `${oneNews.title} ${currentUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 hover:text-green-600"
            >
              <FaWhatsapp size={30} />
            </a>
          </div>
          <hr />
        </div>
      </section>
    </div>
  );
};

export default NewsDetailPage;

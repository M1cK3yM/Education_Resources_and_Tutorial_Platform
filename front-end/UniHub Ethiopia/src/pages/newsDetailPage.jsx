import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getNewsById } from "@/api/news";
import { requestHandler } from "@/utils/requestHandler";
import { Loader } from "rsuite";
import { Button } from "@/components/ui/button";
import {
  FaTelegramPlane,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

export default function NewsDetailsPage() {
  const { newsId } = useParams();
  const [newsDetails, setNewsDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  useEffect(() => {
    if (newsId) {
      fetchNewsDetails();
    }
  }, [newsId]);

  const fetchNewsDetails = async () => {
    await requestHandler(
      () => getNewsById(newsId),
      setLoading,
      (data) => {
        setNewsDetails(data);
        console.log(data);
      },
      (error) => {
        setError(error);
        console.error("Error fetching news details:", error);
      }
    );
  };

  const handleCopyLink = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      alert("Link copied to clipboard. Share it on Instagram!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="md" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
          😔 Oops! Something went wrong
        </h1>
        <p className="text-foreground text-lg sm:text-xl md:text-2xl mb-6">
          We couldn't load the news details. Please try again later.
        </p>
        <Button asChild>
          <a href="/news">Back to News</a>
        </Button>
      </div>
    );
  }

  if (!newsDetails) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
          😔 News Not Found
        </h1>
        <p className="text-foreground text-lg sm:text-xl md:text-2xl mb-6">
          The news article you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <a href="/news">Back to News</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="text-foreground font-sans">
      <main className="container mx-auto mt-20 px-4 md:px-0">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <img
              src={newsDetails.image}
              alt={newsDetails.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">{newsDetails.title}</h1>
          <div className="prose max-w-none mb-8">
            <p>{newsDetails.content}</p>
          </div>
          <div className="mt-8">
            <p className="text-lg font-semibold mb-4">
              Help us spread the word by sharing this page!
            </p>
            <div className="flex space-x-4">
              <a
                href={`https://t.me/share/url?url=${encodeURIComponent(
                  currentUrl
                )}&text=${encodeURIComponent(newsDetails.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
                aria-label="Share on Telegram"
              >
                <FaTelegramPlane size={30} />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  currentUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 hover:text-blue-800"
                aria-label="Share on Facebook"
              >
                <FaFacebook size={30} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  currentUrl
                )}&title=${encodeURIComponent(newsDetails.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-800 hover:text-blue-900"
                aria-label="Share on LinkedIn"
              >
                <FaLinkedin size={30} />
              </a>
              <button
                onClick={handleCopyLink}
                className="text-pink-600 hover:text-pink-700"
                aria-label="Copy link for Instagram"
              >
                <FaInstagram size={30} />
              </button>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  currentUrl
                )}&text=${encodeURIComponent(newsDetails.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600"
                aria-label="Share on Twitter"
              >
                <FaTwitter size={30} />
              </a>
              <a
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                  `${newsDetails.title} ${currentUrl}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-500 hover:text-green-600"
                aria-label="Share on WhatsApp"
              >
                <FaWhatsapp size={30} />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

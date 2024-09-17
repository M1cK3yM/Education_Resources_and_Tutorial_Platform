import { useState, useEffect } from "react";
import NewsCard from "../components/newscard";
import { Button } from "../components/ui/button";
import { Loader } from "rsuite";
import { newsApi } from "@/api";
import { requestHandler } from "@/utils/requestHandler";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchNews = async (currentPage) => {
      try {
        await requestHandler(
          () => newsApi.getAllNews(currentPage),
          setLoading,
          (data) => {
            setNewsData(data.resource);
            setTotalPages(data.pages);
          },
          (error) => setError(error)
        );
      } catch (err) {
        setError("Failed to fetch News");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="relative bg-cover bg-center h-64 md:h-96 lg:h-[500px] shadow-2xl">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold">
            News and Updates
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl">
            Stay informed with the latest news and updates
          </p>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader size="md" />
        </div>
      ) : newsData.length === 0 ? (
        <div className="flex flex-col  items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            😔Oops! You Caught us With no News
          </h1>
          <p className="text-foreground text-2xl">
            Sorry, we will add news Soon or Not .
          </p>
          <div className="mt-4 text-center text-lg ">
            <p className="text-gray-600 mb-6"> You might want to explore:</p>
            <a href="/" className=" p-2 hover:underline">
              <Button>Home</Button>
            </a>
            <a href="/resources" className=" p-2 hover:underline ml-2">
              <Button>Resources</Button>
            </a>
            <a href="/contact" className=" p-2 hover:underline ml-2">
              <Button>Contact </Button>
            </a>
          </div>
        </div>
      ) : (
        <>
          <ul>
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
          </ul>
          <div className="flex justify-center mt-8">
            {totalPages > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={currentPage === 1}
                      onClick={() =>
                        currentPage == 1
                          ? null
                          : handlePageChange(currentPage - 1)
                      }
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}
                  <PaginationItem>
                    <PaginationNext
                      disabled={currentPage === totalPages}
                      onClick={() =>
                        currentPage == totalPages
                          ? null
                          : handlePageChange(currentPage + 1)
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NewsPage;

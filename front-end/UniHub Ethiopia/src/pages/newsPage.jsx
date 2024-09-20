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
    if (!error) {
      fetchNews(currentPage);
    } else {
      setLoading(false);
    }
  }, [currentPage]);

  const fetchNews = async (currentPage) => {
    try {
      await requestHandler(
        () => newsApi.getAllNews(currentPage),
        setLoading,
        (data) => {
          setNewsData(data.news);
          console.log(data);
          setTotalPages(data.pages);
        },
        (error) => setError(error)
      );
    } catch (error) {
      console.error("Error Fetching News : ", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen">
      <div className="relative bg-cover bg-center h-48 sm:h-64 md:h-96 lg:h-[500px] shadow-2xl">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
            News and Updates
          </h1>
          <p className="mt-2 sm:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl">
            Stay informed with the latest news and updates
          </p>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader size="md" />
        </div>
      ) : !newsData ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
            😔 Oops! You Caught us With no News
          </h1>
          <p className="text-foreground text-lg sm:text-xl md:text-2xl mb-6">
            Sorry, we will add news Soon or Not.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild>
              <a href="/">Home</a>
            </Button>
            <Button asChild>
              <a href="/resources">Resources</a>
            </Button>
            <Button asChild>
              <a href="/contact">Contact</a>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <ul className="space-y-6 p-4 sm:p-6 md:p-8">
            {newsData.map((article) => (
              <NewsCard
                key={article._id}
                title={article.title}
                date={article.date}
                description={article.description}
                imageUrl={article.image}
                detailsUrl={`/news/${article._id}`}
              />
            ))}
          </ul>
          <div className="flex justify-center mt-8 pb-8">
            {totalPages > 0 && (
              <Pagination>
                <PaginationContent className="flex-wrap justify-center">
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={currentPage === 1}
                      onClick={() =>
                        currentPage === 1
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
                        currentPage === totalPages
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

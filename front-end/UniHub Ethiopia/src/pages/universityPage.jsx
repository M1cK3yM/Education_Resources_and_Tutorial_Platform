import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader } from "rsuite";
import { universitiesApi } from "@/api";
import { requestHandler } from "@/utils/requestHandler";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import UniversityCard from "@/components/universityCard";
import { List, Grid } from "lucide-react";

function UniversityPage() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [isTileView, setIsTileView] = useState(false);
  useEffect(() => {
    const fetchUniversities = async (currentPage) => {
      try {
        await requestHandler(
          () => universitiesApi.getAllUniversities(currentPage),
          setLoading,
          (data) => {
            setUniversities(data.universities);
            setTotalPages(data.pages);
          },
          (error) => setError(error),
        )
      } catch (err) {
        setError("Failed to fetch Universities");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <div>
      <div className="mt-20 relative h-32 md:h-48 lg:h-72 shadow-2xl rounded-3xl">
        <div className="absolute inset-0 flex items-center justify-center text-center text-foreground p-4 md:p-8 lg:p-12">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold">
            Explore Ethiopian Universities
          </h1>
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader size="md" />
        </div>
      ) : universities.length === 0 ? (
        <div className="flex flex-col  items-center justify-center h-screen">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            😔Oops! Data Not Found
          </h1>
          <p className="text-foreground text-2xl">
            Sorry, we will add some data soon
          </p>
          <div className="mt-4 text-center text-lg ">
            <p className="text-gray-600 mb-6"> You might want to explore:</p>
            <a href="/" className=" p-2 hover:underline">
              <Button>Home</Button>
            </a>
            <a href="/events" className=" p-2 hover:underline ml-2">
              <Button>Events</Button>
            </a>
            <a href="/contact" className=" p-2 hover:underline ml-2">
              <Button>Contact </Button>
            </a>
          </div>
        </div>

      ) : (
        <>
          <div className="max-w-6xl mt-20 mx-auto">
            <div className="flex space-x-2 mb-5 pl-2.5">
              <Button
                color="gray"
                variant="outline"
                onClick={() => setIsTileView(false)}>
                <List className={isTileView ? "text-muted-foreground" : ""} size={18} />
              </Button>
              <Button
                color="gray"
                variant="outline"
                onClick={() => setIsTileView(true)}>
                <Grid className={isTileView ? "" : "text-muted-foreground"} size={18} />
              </Button>
            </div>

            <div className={`grid gap-6 ${isTileView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {universities.map(university => (
                <UniversityCard
                  key={university._id}
                  name={university.name}
                  location={university.location}
                  founded={university.founded}
                  logo={university.logo}
                  isTileView={isTileView} />
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            {totalPages > 0 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      disabled={currentPage === 1}
                      onClick={() => currentPage == 1 ? null : handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => handlePageChange(page)}>
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
                  )}
                  <PaginationItem>
                    <PaginationNext
                      disabled={currentPage === totalPages}
                      onClick={() => currentPage == totalPages ? null : handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      )
      }
    </div >
  );
}

export default UniversityPage;

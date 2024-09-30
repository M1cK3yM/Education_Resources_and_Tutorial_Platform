import { useEffect, useState } from "react";
import EventCard from "@/components/eventCard";
import { requestHandler } from "@/utils/requestHandler";
import { Loader } from "rsuite";
import { eventsApi } from "@/api";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";

function ArchivedPage() {
  const [archivedEvents, setArchivedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (!error) {
      fetch(currentPage);
    } else {
      setLoading(false);
    }
  }, [currentPage]);

  const fetch = async (currentPage) => {
    try {
      await requestHandler(
        () => eventsApi.getArchivedEvents(currentPage),
        setLoading,
        (data) => {
          setArchivedEvents(data.archivedEvents);
          console.log(data);
          setTotalPages(data.pages);
        },
        (error) => setError(error)
      );
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <br />
      <br />
      <br />
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader size="md" />
        </div>
      ) : archivedEvents.length === 0 ? (
        <div className="flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-foreground">
          There are no events
        </div>
      ) : (
        <>
          <ul>
            {archivedEvents.map((event) => (
              <EventCard
                key={event._id}
                title={event.title}
                date={
                  event.date
                    ? `${new Date(event.date).toLocaleDateString()}`
                    : "Date not available"
                }
                note={event.note}
                imageUrl={event.image}
                detailsUrl={`/archived-events/${event._id}`}
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
}

export default ArchivedPage;

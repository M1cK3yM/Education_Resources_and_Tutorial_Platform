import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "@/api/config";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { searchApi } from "@/api";
import { requestHandler } from "@/utils/requestHandler";
import { Loader, CheckboxGroup, Checkbox } from "rsuite";
import EventCard from "@/components/eventCard";
import UserCard from "@/components/userCard";
import ResourceCard from "@/components/ResourceCard";
import NewsCard from "@/components/newscard";

export default function Component() {
  const { searchTerm } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(5);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilter] = useState();
  useEffect(() => {
    if (searchTerm) {
      const fetchResults = async () => {
        await requestHandler(
          () => searchApi.getResults(searchTerm),
          setLoading,
          (data) => setResults(data),
          (error) => setError(error),
        );
      };
      fetchResults();
      console.log("from useEffect", results);
    } else {
      setLoading(false);
    }
  }, [searchTerm]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className="w-full max-w-6xl pt-20 mx-auto">
      <div className="bg-muted/40 min-h-screen">
        <main className="container mx-auto px-4 md:px-6 py-8 grid md:grid-cols-[250px_1fr] gap-8 min-h-screen">
          <div className="bg-background rounded-md shadow-sm p-4 h-full">
            <h2 className="text-lg font-medium mb-4">Filter</h2>
            <CheckboxGroup
              inline
              name="filters"
              onChange={handleFilterChange}
              value={filters}
              className="block w-full"
            >
              <Checkbox value="Event">Event</Checkbox>
              <Checkbox value="users">User</Checkbox>
              <Checkbox value="Resource">Resource</Checkbox>
            </CheckboxGroup>
          </div>
          <div className="bg-background rounded-md shadow-sm p-4 h-full">
            {loading && (
              <div className="flex justify-center items-center h-full">
                <Loader size="md" />
              </div>
            )}
            {(error || !searchTerm) && (
              <div className="flex justify-center items-center h-full">
                <p className="text-lg font-medium">No results found.</p>
              </div>
            )}
            {!loading && !error && searchTerm && (
              <ul>
                {currentResults.map((result) => {
                  switch (result.collectionName) {
                    case "Event":
                      return (
                        <EventCard
                          key={result._id}
                          title={result.title}
                          date={
                            result.date
                              ? `${new Date(result.date).toLocaleDateString()}`
                              : "Date not available"
                          }
                          note={result.note}
                          imageUrl={result.image}
                          detailsUrl={`/events/${result._id}`}
                        />
                      );
                    case "users":
                      return (
                        <UserCard
                          key={result._id}
                          name={result.name}
                          email={result.email}
                          profileImageUrl={
                            result.profile
                          }
                          role={result.role}
                        />
                      );
                    case "Resource":
                      return (
                        <ResourceCard
                          key={result._id}
                          title={result.title}
                          description={result.description}
                          type={result.type}
                          url={result.url}
                          resource={result}
                          coverImage={result.coverImage}
                          tags={result.tags}
                        />
                      );
                    case "News":
                      return (
                        <NewsCard
                          key={result._id}
                          title={result.title}
                          date={
                            result.date
                              ? `${new Date(result.date).toLocaleDateString()}`
                              : "Date not available"
                          }
                          imageUrl={result.image}
                          detailsUrl={`/news/${result._id}`}
                        />
                      );
                    default:
                      return null;
                  }
                })}
              </ul>
            )}
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
                            onClick={() => handlePageChange(page)}
                          >
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
          </div>
        </main>
      </div>
    </div>
  );
}

import { useNavigate, useLocation } from 'react-router-dom';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const PaginationComponent = ({ totalPages, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Helper function to update the page in URL query
  const changePage = (pageNumber) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber);
    setCurrentPage(pageNumber); // Update the current page in state
    navigate(`${location.pathname}?${searchParams.toString()}`); // Navigate to updated URL
  };

  return (
    <Pagination aria-label="Page navigation">
      <PaginationContent className="background-light900_dark200 text-dark200_light900">
        {/* Previous Button */}
        <PaginationItem disabled={currentPage === 1}>
          <PaginationPrevious onClick={() => changePage(currentPage - 1)} href="#">
            Prev
          </PaginationPrevious>
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <PaginationItem key={pageNumber} active={pageNumber === currentPage}>
              <PaginationLink onClick={() => changePage(pageNumber)} href="#">
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Ellipsis for pages */}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>

        {/* Next Button */}
        <PaginationItem disabled={currentPage === totalPages}>
          <PaginationNext onClick={() => changePage(currentPage + 1)} href="#">
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;

import ReactPaginate from "react-paginate";
import css from "./Pagination.module.css";
console.log("ReactPaginate =", ReactPaginate);
interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const handlePageClick = ({ selected }: { selected: number }) => {
    onPageChange(selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={handlePageClick}
      containerClassName={css.pagination}
      pageClassName={css.page}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.page}
      previousLinkClassName={css.pageLink}
      nextClassName={css.page}
      nextLinkClassName={css.pageLink}
      disabledClassName={css.disabled}
      breakClassName={css.page}
      breakLinkClassName={css.pageLink}
      previousLabel="←"
      nextLabel="→"
    />
  );
}

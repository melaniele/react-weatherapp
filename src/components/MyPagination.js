import React from "react";
import { Pagination, Container } from "react-bootstrap";
import "./../cite.css";

export default function MyPagination({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
  prevPage,
  nextPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container className="mainForm">
      <div id="pagination">
        <Pagination>
          <Pagination.Prev onClick={() => prevPage()} />

          {pageNumbers.map((num) => {
            return (
              <Pagination.Item
                key={num}
                active={num === currentPage}
                onClick={() => paginate(num)}
              >
                {num}
              </Pagination.Item>
            );
          })}

          <Pagination.Next
            onClick={() => nextPage(Math.ceil(totalPosts / postsPerPage))}
          />
        </Pagination>
      </div>
    </Container>
  );
}

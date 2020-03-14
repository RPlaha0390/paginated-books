import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {
  Row,
  Col,
  Jumbotron,
  Card,
  Button,
  Accordion,
  Container
} from 'react-bootstrap';
import api, { Paginated } from '../api/api';
import { BooksServerData } from '../api/services/books';

const BookList = () => {
  /** CONSTANTS */

  const location = useLocation();
  const history = useHistory();
  const path = window.location.pathname;

  /** STATE */

  const [data, setData] = useState<null | Paginated<BooksServerData>>(null);
  const [currentPage, setCurrentPage] = useState(1);

  /** EFFECTS */

  useEffect(() => {
    const initialQueryString = queryString.parse(location.search);
    const initialPageNumber = Number(initialQueryString.page);
    const isValidPageNumber = Boolean(initialPageNumber);

    history.push(
      `${path}?page=${isValidPageNumber ? initialPageNumber : currentPage}`
    );
  }, []);

  useEffect(() => {
    api.books
      .postBooks({
        page: currentPage,
        itemsPerPage: 20
      })
      .then(res => setData(res));
  }, [currentPage]);

  useEffect(() => {
    if (currentPage > 0) {
      history.push(`${path}?page=${currentPage}`);
    }
  }, [currentPage]);

  /** UI */

  return (
    <Container>
      <Jumbotron>
        <h1 className="h1 text-center">Paginated Books</h1>
      </Jumbotron>
      <Row>
        <Col></Col>
        <Col></Col>
        <Col>
          <div className="d-flex justify-content-end">
            <Button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-3 flex-fill"
            >
              Back
            </Button>
            <Button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={data ? data.moreItems : false}
              className="flex-fill"
            >
              Forward
            </Button>
          </div>
        </Col>
      </Row>
      <Accordion>
        {data
          ? data.items.books.map(book => (
              <Card>
                <Card.Header>
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={`${book.id}`}
                    className="text-left"
                  >
                    {book.book_title}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={`${book.id}`}>
                  <Card.Body>
                    <p>Book author: {book.book_author}</p>
                    <p>Book pages: {book.book_pages}</p>
                    <p>Publication year: {book.book_publication_year}</p>
                    <p>Publication country: {book.book_publication_country}</p>
                    <p>Publication city: {book.book_publication_city}</p>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            ))
          : null}
      </Accordion>
    </Container>
  );
};

export default BookList;

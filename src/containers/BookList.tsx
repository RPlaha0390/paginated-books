import React, { useEffect, useState } from 'react';
import api, { Paginated } from '../api/api';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { BooksServerData } from '../api/services/books';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';

const BookList = () => {
  /** CONSTANTS */

  const location = useLocation();
  const history = useHistory();

  /** STATE */

  const [data, setData] = useState<null | Paginated<BooksServerData>>(null);
  const [currentPage, setCurrentPage] = useState(1);

  /** EFFECTS */

  useEffect(() => {
    const initialQueryString = queryString.parse(location.search);
    const initialPageNumber = Number(initialQueryString.page);
    const isValidPageNumber = Boolean(initialPageNumber);

    history.push(
      `${window.location.pathname}?page=${
        isValidPageNumber ? initialPageNumber : currentPage
      }`
    );

    setCurrentPage(initialPageNumber);
  }, []);

  useEffect(() => {
    api.books
      .postBooks({
        page: currentPage,
        itemsPerPage: 20
      })
      .then(res => setData(res));
  }, [currentPage]);

  /** UI */

  return (
    <Container>
      <Jumbotron>
        <h1 className="h1 text-center">Paginated Books</h1>
      </Jumbotron>
      <Accordion defaultActiveKey="0">
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

import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import {
  Row,
  Col,
  Jumbotron,
  Card,
  Button,
  Container,
  Spinner
} from 'react-bootstrap';
import api, { Paginated } from '../api/api';
import { BooksServerData } from '../api/services/books';
import SearchInput from '../components/Inputs/SearchInput';

const BookList = () => {
  /** CONSTANTS */

  const location = useLocation();
  const history = useHistory();
  const path = window.location.pathname;
  const initialQueryString = queryString.parse(location.search);
  const initialPageNumber = Number(initialQueryString.page);

  /** STATE */

  const [data, setData] = useState<null | Paginated<BooksServerData>>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPageNumber);

  /** EFFECTS */

  useEffect(() => {
    history.push(`${path}?page=${currentPage}`);
  }, []);

  useEffect(() => {
    setLoading(false);

    api.books
      .postBooks({
        page: currentPage,
        itemsPerPage: 20
      })
      .then(res => {
        setLoading(true);
        return setData(res);
      });
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
        <Col xs="12" sm="6">
          <SearchInput />
        </Col>
        <Col xs="12" sm="6" className="d-flex justify-content-end">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-3 flex-fill"
          >
            Prev Page
          </Button>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={data ? data.moreItems : false}
            className="flex-fill"
          >
            Next Page
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        {data && loading ? (
          data.items.books.map(book => (
            <Col xs="12" lg="6" className="mb-4">
              <Card border="primary" className="w-100 h-100">
                <Card.Body>
                  <Card.Title>{book.book_title}</Card.Title>
                  <Card.Text>
                    Book author:
                    {book.book_author.map((bookAuthor, index) => (
                      <span> {bookAuthor}</span>
                    ))}
                  </Card.Text>
                  <Card.Text>Book pages: {book.book_pages}</Card.Text>
                  <Card.Text>
                    Publication year: {book.book_publication_year}
                  </Card.Text>
                  <Card.Text>
                    Publication country: {book.book_publication_country}
                  </Card.Text>
                  <Card.Text>
                    Publication city: {book.book_publication_city}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col
            className="d-flex justify-content-center align-items-center flex-column"
            style={{ minHeight: '50vh' }}
          >
            <Spinner animation="border" variant="primary" />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default BookList;

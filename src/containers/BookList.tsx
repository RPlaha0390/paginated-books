import queryString from 'query-string';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Jumbotron,
  Row,
  Spinner,
} from 'react-bootstrap';
import {useHistory, useLocation} from 'react-router-dom';
import api, {Paginated} from '../api/api';
import {BooksServerData} from '../api/services/books';
import SearchInput from '../components/Inputs/SearchInput';
import NoResults from '../components/NoResults/NoResults';

const BookList = () => {
  /** CONSTANTS */

  const location = useLocation();
  const history = useHistory();
  const path = window.location.pathname;
  const initialQueryString = queryString.parse(location.search);
  const initialPageNumber = Number(initialQueryString.page) || 1;

  /** STATE */

  const [data, setData] = useState<null | Paginated<BooksServerData>>(null);
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(initialPageNumber);
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);

  /** EFFECTS */

  useEffect(() => {
    history.push(`${path}?page=${currentPage}`);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLoaded(false);

    api.books
      .postBooks({
        page: currentPage,
        itemsPerPage: 20,
        filters: [{type: 'all', values: [searchTerm]}],
      })
      .then(res => {
        setLoaded(true);
        setSearched(false);
        return setData(res);
      });
    // eslint-disable-next-line
  }, [currentPage, searched]);

  useEffect(() => {
    if (currentPage > 0) {
      history.push(`${path}?page=${currentPage}`);
    }
  }, [currentPage, history, path]);

  /** CALLBACKS */

  const handleSearchInputChange = useCallback(searchTermValue => {
    setSearchTerm(searchTermValue);
  }, []);

  const handleSearchSubmit = useCallback(event => {
    event.preventDefault();
    setCurrentPage(1);
    setSearched(true);
  }, []);

  /** UI */

  return (
    <Container>
      <Jumbotron className="text-white text-center py-5 px-4 my-5 bg-primary">
        <h1 className="h1 text-center">Paginated Books</h1>
      </Jumbotron>
      <Row>
        <Col xs="12" sm="6">
          <SearchInput
            buttonDisabled={!searchTerm}
            handleSubmit={e => handleSearchSubmit(e)}
            onInputChange={(value: string) => handleSearchInputChange(value)}
          />
        </Col>
        <Col xs="12" sm="6" className="d-flex justify-content-end">
          <Button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="mr-3 flex-fill">
            Prev Page
          </Button>
          <Button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={data ? data.moreItems : false}
            className="flex-fill">
            Next Page
          </Button>
        </Col>
      </Row>
      <Row className="mt-4">
        {data && loaded ? (
          data.items.books.map(book => (
            <Col xs="12" lg="6" className="mb-4" key={book.id}>
              <Card border="primary" className="w-100 h-100">
                <Card.Body>
                  <Card.Title>{book.book_title}</Card.Title>
                  <Card.Text>
                    Book author:{' '}
                    {book.book_author.map((bookAuthor, index) => bookAuthor)}
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
            style={{minHeight: '50vh'}}>
            <Spinner animation="border" variant="primary" />
          </Col>
        )}
        {data && loaded && data.items.books.length <= 0 && <NoResults />}
      </Row>
    </Container>
  );
};

export default BookList;

import React from 'react';
import { Button, Col } from 'react-bootstrap';

const NoResults = () => (
  <Col
    className="d-flex justify-content-center align-items-center flex-column"
    style={{ minHeight: '50vh' }}
  >
    <p className="mb-5">Sorry there are no results to show here.</p>
    <Button onClick={() => window.location.reload()}>Refresh</Button>
  </Col>
);
export default NoResults;

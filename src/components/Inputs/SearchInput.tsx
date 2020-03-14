import React from 'react';
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap';

const SearchInput = () => {
  return (
    <Form inline className="mb-4 mb-sm-1">
      <InputGroup>
        <FormControl type="text" placeholder="Search" />
        <InputGroup.Prepend>
          <Button variant="primary">Search</Button>
        </InputGroup.Prepend>
      </InputGroup>
    </Form>
  );
};

export default SearchInput;

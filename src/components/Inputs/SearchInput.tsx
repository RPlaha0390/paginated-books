import React from 'react';
import {Button, Form, FormControl, InputGroup} from 'react-bootstrap';

const SearchInput = ({
  onInputChange,
  handleSubmit,
  buttonDisabled,
}: {
  onInputChange: (value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  buttonDisabled: boolean;
}) => {
  return (
    <Form
      inline
      className="mb-4 mb-sm-1"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
      <InputGroup>
        <FormControl
          type="text"
          placeholder="Search"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange(event.target.value)
          }
        />
        <InputGroup.Prepend>
          <Button variant="primary" type="submit" disabled={buttonDisabled}>
            Search
          </Button>
        </InputGroup.Prepend>
      </InputGroup>
    </Form>
  );
};

export default SearchInput;

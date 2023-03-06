import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function SearchBox() {
  const [keyword, setKeyword] = useState('');

  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}&page=1`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };
  return (
    <Row>
      <Form onSubmit={submitHandler} inline>
        <Col>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            className='mr-sm-2 ml-sm-5'
          ></Form.Control>
        </Col>
        <Col>
          <Button type='submit' variant='outline-success' className='p-2'>
            Submit
          </Button>
        </Col>
      </Form>
    </Row>
  );
}

export default SearchBox;

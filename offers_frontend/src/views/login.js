import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { Login } from '../data/apiCall';

export default function LoginForm() {
  const [state, setState] = useState({ auth: false });
  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    let response = await Login(state);

    if (response.statusCode === 200 && response.auth) {
      setState({ ...state, auth: response.auth });
    } else {
      setState({ ...state, msg: response.msg });
    }
  };

  if (state.auth) {
    return <Redirect to='/dashbord' />;
  } else {
    return (
      <div>
        <Container className='mt-5 d-flex justify-content-center'>
          <Card style={{ width: '30rem' }}>
            <Card.Body>
              <Card.Title className='text-center'>Login</Card.Title>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  name='email'
                  onChange={handleChange}
                  placeholder='Enter email'
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  onChange={handleChange}
                  placeholder='Password'
                />
              </Form.Group>
              <Row className='d-flex justify-content-center'>
                <Button onClick={onSubmit} variant='warning'>
                  Login
                </Button>
              </Row>
              <p className='text-center mt-3'>{state.msg}</p>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

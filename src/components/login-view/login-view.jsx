import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col, Card, CardGroup,  } from "react-bootstrap/";
import axios from 'axios';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(username, password);
  //   /* Send a request to the server for authentication */
  //   /* then call props.onLoggedIn(username) */
  //   props.onLoggedIn(username);
  // };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    /* had to add /login?Username=rehanarshd94&Password=password1234 to make connection work; did not work with /login*/
    axios.post('https://my-movie-flix.herokuapp.com/login?Username=rehanarshad94&Password=password1234', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };



  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Title>LOGIN</Card.Title>
                <Card.Body>
                  <Form style={{ width: '20rem'}}>

                    <Form.Group controlId="formUsername">
                      <Form.Label>Username :</Form.Label>
                      <Form.Control type="text" placeholder='Enter Username' onChange={e => setUsername(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control type="password" placeholder='Enter Password' onChange={e => setPassword(e.target.value)} minLength='7' required />
                    </Form.Group>
                  
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                      Submit
                    </Button>

                    <Button type="submit">Register</Button>
                    

                  </Form>
                
                </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}



LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};

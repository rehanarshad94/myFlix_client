import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button, Container, Row, Col, Card, CardGroup,  } from "react-bootstrap/";
import axios from 'axios';
import { Link } from "react-router-dom";

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
    axios.post(`https://my-movie-flix.herokuapp.com/login?Username=${username}&Password=${password}`, {
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
        <Col style={{marginTop: '20px'}}>
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

                    <br />
                  
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                      Submit
                    </Button>
                    &nbsp;
                    <Link to={'/register'}>
                    <Button type="submit" variant="primary">Register</Button>
                    </Link>
                    
                    

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

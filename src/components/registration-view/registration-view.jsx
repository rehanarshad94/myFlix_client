import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, Button, Card, CardGroup, Container, Row, Col } from "react-bootstrap";

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);
        props.onRegister(username);
    }

return (
    <Container>
        <Row>
            <Col>
                <CardGroup>
                    <Card>
                        <Card.Title>Register</Card.Title>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="formUsername">
                                <Form.Label> Username: </Form.Label>
                                <Form.Control type="text" placeholder="Enter a Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                <Form.Label> Password: </Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="7" required />
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                <Form.Label> Email: </Form.Label>
                                <Form.Control type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} required />
                                </Form.Group>

                                <Form.Group controlId="formBirthday">
                                <Form.Label> Birthday: </Form.Label>
                                <Form.Control type="birthday" value={birthday} placeholder="DD-MM-YYYY" onChange={(e) => setBirthday(e.target.value)}required />
                                </Form.Group>

                                <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Col>
        </Row>
    </Container>
)

    
}

RegistrationView.propTypes = {
    registration: PropTypes.shape({
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
      Birthday: PropTypes.number
    }).isRequired,
    onRegistrationClick: PropTypes.func.isRequired
  };


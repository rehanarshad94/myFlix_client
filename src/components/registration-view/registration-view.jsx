import React, { useState } from "react";
import axios from "axios"
import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import { Form, Button, Card, CardGroup, Container, Row, Col } from "react-bootstrap";
import './registration-view.scss'

export function RegistrationView(props) {
    const [ name, setName ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const [ values, setValues ] = useState({
        nameErr: '',
        usernameErr: '',
        passwordErr: '',
        emailErr: ''
    });

    const validate = () => {
        let isReq = true;
        if(name){
            setValues({...values, nameErr: 'Name is required'});
            isReq = false;
        }
        if (!username){
            setValues({...values, usernameErr: 'Username is required'});
            isReq = false;
        } else if (username.length > 5){
            setValues({...values, usernameErr: 'Username must be 5 characters long'});
            isReq = false;
        }
        if (!password) {
            setValues({...values, passwordErr: 'Password Required'});
            isReq = false;
        } else if (password .length < 6){
            setValues({...values, passwordErr: 'Password must be 6 characters long'});
            isReq = false;
        } if (!email) {
            setValues({...values, emailErr: 'Email Required'});
            isReq = false;
        } else if (email.indexOf('@') === -1) {
            setValues({...values, emailErr: 'Email is invalid.' });
            isReq = false;
        } 
            return isReq;
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://my-movie-flix.herokuapp.com/users', {
                Name: name,
                Username: username,
                Password: password,
                Email: email,
                Birthdy: birthday
            }).then(response => {
                const data = response.data;
                console.log(data);
                alter('Registration successful, login!');
                window.open('/', '_self');
            }).catch(response => {
                console.error(response);
                alter('unable to register')
            });
        }
    };




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
                                {values.usernameErr && <p> {values.usernameErr}</p>} 
                                </Form.Group>

                                <Form.Group controlId="formPassword">
                                <Form.Label> Password: </Form.Label>
                                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} minLength="7" required />
                                {values.nameErr && <p> {values.PasswordErr}</p>}
                                </Form.Group>

                                <Form.Group controlId="formEmail">
                                <Form.Label> Email: </Form.Label>
                                <Form.Control type="email" value={email} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} required />
                                {values.emailErr && <p> {values.emailErr}</p>}
                                </Form.Group>

                                <Form.Group controlId="formBirthday">
                                <Form.Label> Birthday: </Form.Label>
                                <Form.Control type="birthday" value={birthday} placeholder="DD-MM-YYYY" onChange={(e) => setBirthday(e.target.value)}required />
                                {values.birthdayErr && <p> {values.birthdayErr}</p>}
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


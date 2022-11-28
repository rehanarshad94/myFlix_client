import React, { useState } from "react";
import axios from "axios"
import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import { Form, Button, Container, Row, Col } from "react-bootstrap";
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

    // const handleRegister = (e) => {
    //     e.preventDefault();
    //     axios.post('https://my-movie-flix.herokuapp.com/users', {
    //         Username: username,
    //         Password: password,
    //         Email: email,
    //         Birthday: birthday
    //     })
    //     .then(response => {
    //         const data = response.data;
    //         console.log(data);
    //         window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
    //     })
    //     .catch(e => {
    //         console.log('error registering the user')
    //     });
    // };



return (
    <Row className="mt-5">
        <Col md={12}>
            <Form>
                <h3>Sign Up</h3>
                <p></p>
                <Form.Group controlID="formName" className="reg-form-inputs">
                    <Form.Label>Name:</Form.Label>
                    <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} />
                    {values.nameErr && <p>{values.nameErr}</p>}
                </Form.Group>
                <br />

                <Form.Group controlID="formUsername" className="reg-form-inputs">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                    {values.usernameErr && <p>{values.usernameErr}</p>}
                </Form.Group>
                <br />

                <Form.Group controlID="formPassword" className="reg-form-inputs">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    {values.passwordErr && <p>{values.passwordErr}</p>}
                </Form.Group>
                <br />

                <Form.Group controlID="formEmail" className="reg-form-inputs">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="password" value={email} onChange={e => setEmail(e.target.value)} />
                    {values.emailErr && <p>{values.emailErr}</p>}
                </Form.Group>
                <br />

                <Form.Group controlID="updateBirthday">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control type="date" name="birthday" onChange={(e) => setBirthday(e.target.value)} />
                </Form.Group>
                <br />
                
                <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                <p></p>
                <p>Already Registered <Link to={'/'}>Sign In</Link> Here.</p>
            </Form>
        </Col>
    </Row>
  );
}

RegistrationView.propTypes = {
    registration: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Username: PropTypes.string.isRequired,
      Password: PropTypes.string.isRequired,
      Email: PropTypes.string.isRequired,
    })
};

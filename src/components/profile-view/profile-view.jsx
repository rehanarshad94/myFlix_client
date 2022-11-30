import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Card, Form, Figure} from "react-bootstrap";


export default class ProfileView extends React.Component {
    constructor() {
      super();
      this.state = {
        Username: null,
        Password: null,
        Email: null,
        Birthday: null,
        FavoriteMovies: [],
      };
    }


  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }



    onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  getUser = (token) => {
    const Username = localStorage.getItem("user");
    axios
      .get(`https://my-movie-flix.herokuapp.com/movies/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  editUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://my-movie-flix.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response)
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", this.state.Username);
        const data = response.data;
        console.log(data);
        console.log(this.state.Username);
        alert("Profile Updated!");
        window.open(`/users/${Username}`, "_self");
      })
      .catch(function (error) {
        console.error(error);
      });
  };



  // Unregister
  onDeleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://my-movie-flix.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile Deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onRemoveFavorite = (movie) => {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(movie)
    axios
      .delete(
        `https://my-movie-flix.herokuapp.com/users/${username}/movies/${movie}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was removed from favorites.");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  
  setUsername(value) {
    this.setState({
      Username: value,
    });
    this.Username = value;
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
    this.Password = value;
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
    this.Email = value;
  }

  setBirthday(value) {
    console.warn("setBirthday", value);
    this.setState({
      Birthday: value,
    });
    this.Birthday = value;
  }
  test(){
    alert('works')
  }
  render() {
    const { movies } = this.props;
    const { FavoriteMovies, Username, Email, Birthday, Password } = this.state;

    const myFavoritesMovies = movies ? FavoriteMovies.map(movieId =>{
        return movies.filter(mov => mov._id === parseInt(movieId))[0]
    }) : []
    // for (let index = 0; index < movies.length; index++) {
    //   const movie = movies[index];
    //   if (FavoriteMovies.includes(movie._id)) {
    //     myFavoritesMovies.push(movie);
    //   }
    // }

    return (
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>Profile</Card.Header>
              <Card.Body>
                <>
                  <p>Username: {Username}</p>
                  <p>Password: {Password}</p>
                  <p>Email: {Email}</p>
                  <p>Birthday: {Birthday}</p>
                </>
              </Card.Body>
            </Card>
          </Col>
          
          <Col>
            <Card>
              <Card.Header>Update Profile</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Form onSubmit={(e) => this.editUser(e, this.Username, this.Password, this.Email, this.Birthday)}>
                   
                    <Form.Group>
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="text" name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)}required/>
                    </Form.Group>
                    
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)}required/>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)}required/>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Birthday</Form.Label>
                      <Form.Control type="date" name="Birthday" onChange={(e) => this.setBirthday(e.target.value)}/>
                    </Form.Group>
                    <br />
                    <Form.Group><Button type="submit" variant="info" onClick={(e) => this.editUser(e)}>Update Info</Button>
                      
                      <br />
                      <br />

                      <Button variant="danger" onClick={() => this.onDeleteUser()}>Delete User</Button>
                    </Form.Group>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
       
       
        <Card>
          <Card.Body>
            <Row>
              <Col>
                <h4>Favorite Movies</h4>
              </Col>
            </Row>

            <Row>
              {myFavoritesMovies.map((movie) => (
                <Col key={movie._id}>
                  <Figure>
                    <Link to={`/movies/${movie._id}`}>
                      <Figure.Image src={movie.ImagePath} alt={movie.Title} crossOrigin="true"/>
                      <Figure.Caption>{movie.Title}</Figure.Caption>
                    </Link>
                  </Figure>
                  <Button variant="secondary" onClick={()=>{this.onRemoveFavorite(movie._id)}}>Remove from the list</Button>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        <br />

      </Container>
     
     
    );
  }
}
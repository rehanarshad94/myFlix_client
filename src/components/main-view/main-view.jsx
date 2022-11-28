// requirement for creating a component
import React from "react";
import axios from "axios";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { BrowserRouter as Router, Route } from "react-router-dom"
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Row, Col, Container } from "react-bootstrap/";
import { Menubar } from "../navbar-view/navbar";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";




// React.Component is a template or blueprint for creating a component
// export exposes the MainView component and makes it available for use for by other components, modules, and files
// class Mainview extendes React.Component creates the MainView component w/ class keyword stating its a class component and not a function component
// extends means youre telling React to create a new Mainview component using generic React.Component template as its foundation
// render() is what presents the visual representation to be displayed to viewer on the screen 
export class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
          movies: [],
          selectedMovie: null,
          user: null
        }
      }

      componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
        this.setState({
        user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    }
      
      /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
      setSelectedMovie(movie) {
        this.setState({
          selectedMovie: movie
        });
      }

      // /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
      // onLoggedIn(user) {
      //   this.setState({
      //     user
      //   })
      // }

      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });
      
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
      }


      onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
          user: null
        });
      }


      getMovies(token) {
        axios.get('https://my-movie-flix.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }



    
      render() {
        const { movies, user } = this.state;
    
        return (
            <Router>
              <Menubar user={user} />
              <Container>
              <Row className="main-view justify-content-md-center">
               
                <Route exact path="/" render={() => {
                  // if (!user) return (
                  // <Col>
                  // <LoginView movies={movies} onLoggedIn={user => this.onLoggedIn(user)} />
                  // </Col> )
                  if (!user) return ( <Row>
                  <Col>
                 <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                 </Col>
                </Row> )

                  // Before the movies have been loaded
                  if (movies.length === 0) return <div className="main-view" />

                  return ( movies.map(m => (
                    <Col md={3} key={m._id}>
                      <MovieCard movie={m} />
                    </Col> )
                  ))
                }} />
               


                <Route path="/register" render={() => {
                  if (user) return <Redirect to="/" />
                  return ( <Col lg={8} md={8}>
                    <RegistrationView />
                  </Col> )
                }} />
               


                <Route path="/movies/:id" render={({ match, history}) => {

                if (!user) return ( <Row>
                  <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                </Row> )
                  
                  return (<Col md={8}>
                    <MovieView movie={movies.find(m => m._id === Number(match.params.id))} onBackClick={() => history.goBack()} />
                  </Col>)
                }} />
               


                <Route path="/directors/:name" render={({ match, history}) => {

                if (!user) return ( <Row>
                  <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                </Row> )
                  
                  return (<Col>
                    <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                  </Col>)
                }} />


                
                <Route path="/genres/:name" render={({ match, history}) => {

                  if (!user) return ( <Row>
                    <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  </Row> )


                  return ( <Col>
                    <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                  </Col> )
                }} />
               


                <Route path="/users" render={({ match, history}) => {
                  if (!user) return ( <Row>
                  <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  </Row> )
                 
                   return (<Col>
                  <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()}/>
                  </Col>)
                }} />
               


                <Route path="/users/:Username" render={({ match, history}) => {
                  if (!user) return ( <Row>
                  <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                  </Row> )
      
                   return (<Col>
                  <userUpdate user={user} onBackClick={() => history.goBack()}/>
                  </Col>)
                }} />
                
                
                </Row>
              </Container>
            </Router>
        );
      }
    }

    


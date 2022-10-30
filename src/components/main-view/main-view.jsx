// requirement for creating a component
import React from "react";
import axios from "axios";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";


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
        axios.get('https://my-movie-flix.herokuapp.com/movies')
          .then(response => {
            this.setState({
              movies: response.data
            });
          })
          .catch(error => {
            console.log(error)
          });
      }
      
      /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
      setSelectedMovie(movie) {
        this.setState({
          selectedMovie: movie
        });
      }

      /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/
      onLoggedIn(user) {
        this.setState({
          user
        })
      }
    
      render() {
        const { movies, selectedMovie, user } = this.state;

      /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
      
      // Before the movies have been loaded
      if (movies.length === 0) return <div className="main-view" />;
      
        return (
          <div className="main-view">
            {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
    }
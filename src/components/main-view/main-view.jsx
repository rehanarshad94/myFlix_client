// requirement for creating a component
import React from "react";
import axios from "axios";
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
          selectedMovie: null
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
    
      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }
    
      render() {
        const { movies, selectedMovie } = this.state;
      
        if (movies.length === 0) return <div className="main-view" />;
      
        return (
          <div className="main-view">
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
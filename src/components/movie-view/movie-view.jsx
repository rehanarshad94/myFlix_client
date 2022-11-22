import React from 'react';
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom"

export class MovieView extends React.Component {

  keypressCallBack(event) {
    console.log(event.key)
  }

  componentDidMount(){
    document.addEventListener('keypress', this.keypressCallBack);
  }

  componentWillUnmount(){
    document.removeEventListener('keypress', this.keypressCallBack);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
          <div className="movie-poster">
            <img src={movie.ImagePath} crossOrigin="true" />
          </div>
          <br />
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <br />
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span> 
          </div>
          <br />
          <div className="movie-genre-name">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
          </div>
          <br />
          <div className="movie-genre-description">
            <span className="label">Genre Description: </span>
            <span className="value">{movie.Genre.Description}</span>
          </div>
          <br />
          <div className="movie-director-name">
            <span className="label">Director Name: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          <br />
          <div className="movie-director-bio">
            <span className="label">Director Bio: </span>
            <span className="value">{movie.Director.Bio}</span>
          </div>
          <br />
          <Button onClick={()=> { onBackClick(null);}}>Back</Button>
          <Link to={`/movies/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
          </Link>
          <Link to={`/movies/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
          </Link>
       </div>
    );
  }
}


MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
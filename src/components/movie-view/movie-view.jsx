import React from 'react';
import PropTypes from "prop-types";

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
          <div className="movie-director-birth">
            <span className="label">Director Birth: </span>
            <span className="value">{movie.Director.Birth}</span>
          </div>
          <br />
          <div className="movie-director-death">
            <span className="label">Director Death: </span>
            <span className="value">{movie.Director.Death}</span>
          </div>
          <br />
          <button onClick={() => { onBackClick(null); }}>Back</button>
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
      Birth: PropTypes.number.isRequired,
      Death: PropTypes.number.isRequired
    }),
    ImagePath: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
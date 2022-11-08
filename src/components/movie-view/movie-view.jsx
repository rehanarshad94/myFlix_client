import React from 'react';
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
          <div className="movie-poster">
            <img src={movie.ImagePath} crossOrigin="true" />
          </div>
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
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
          <Button onClick={() => { onBackClick(null); }}>Back</Button>
       </div>
    );
  }
}
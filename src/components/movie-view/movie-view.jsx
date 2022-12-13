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
    const { movie, onBackClick, handleFavorite } = this.props;

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
          <br />
          <Button onClick={()=> { onBackClick();}}>Back</Button>
          <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
          </Link>
          <Button variant="primary" onClick={() => handleFavorite(movie._id, "add")}>Favorite</Button>
       </div>
    );
  }
}


MovieView.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.number.isRequired,
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
    ImagePath: PropTypes.string
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
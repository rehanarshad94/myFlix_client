import React from 'react';
import PropTypes from "prop-types";
import{ Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    console.log("hello");
    debugger
    return (
      <Card style={{ width: '15rem', margin: '1rem'}}>
        <Card.Img variant="top" src={movie.ImagePath} crossOrigin="true" />
          <Card.Body>
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Description}</Card.Text>
            <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
            </Link>
          </Card.Body>
      </Card>
    );
  }
}




MovieCard.propTypes = {
  movie: PropTypes.shape({
    ID: PropTypes.number.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired
};
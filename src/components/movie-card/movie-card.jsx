import React from 'react';
import PropTypes from "prop-types";
import{ Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";


export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Container>
        <Row>
          <Col xs={12} md={6} lg={3}>
            <Card style={{ width: '15rem', margin: '1rem'}}>
              <Card.Img variant="top" src={movie.ImagePath} crossOrigin="true" />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Text>{movie.Description}</Card.Text>
                </Card.Body>
                <Card.Footer>
                <Link to={`/movies/${movie._id}`}>
                  <Button variant="link">Open</Button>
                  </Link>
                </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}




MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired
};
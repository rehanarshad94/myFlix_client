import React from "react";
import Proptypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class GenreView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props

        return (
            <Card>
               <Card.Header>Genre</Card.Header>
               <Card.Body>{movie.Genre.Name}</Card.Body>
               <Card.Body>{movie.Genre.Description}</Card.Body>
               <Link to={`/movies/genres/:Name${movie._id}`}>
               <Button onClick={()=> { onBackClick(null); }}>exit</Button>
               </Link>
            </Card>
        )
    }
}

GenreView.proptypes = {
    genre: Proptypes.shape({
        Name: Proptypes.string.isRequired,
        Description: Proptypes.string.isRequired,
    })
}
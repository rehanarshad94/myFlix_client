import React from "react";
import Proptypes from "prop-types";
import { Card } from "react-bootstrap";

export class GenreView extends React.Component {
    render() {
        const { Genre, movie } = this.props

        return (
            <Card>
               <Card.Header>Genre</Card.Header>
               <Card.Body>{movie.genre.Name}</Card.Body>
               <Link to={`/movies/genres/:Name`}></Link>
            </Card>
        )
    }
}

GenreView.proptypes = {
    Genre: Proptypes.shape({
        Name: Proptypes.string.isRequired,
        Description: Proptypes.string.isRequired
    }).isRequired
}
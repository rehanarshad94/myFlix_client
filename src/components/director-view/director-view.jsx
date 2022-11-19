import React from "react";
import Proptypes from "prop-types";
import { Card } from "react-bootstrap";

export class DirectorView extends React.Component {
    render() {
        const { director, movies, movie } = this.props

        return (
            <Card>
               <Card.Header>Director</Card.Header>
               <Card.Body>{movie.director.Name}</Card.Body>
               <Link to={`/movies/directors/:Name`}></Link>
            </Card>
        )
    }
}

DirectorView.proptypes = {
    director: Proptypes.shape({
        Name: Proptypes.string.isRequired,
        Bio: Proptypes.string.isRequired
    })
}
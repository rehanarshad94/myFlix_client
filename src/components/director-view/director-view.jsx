import React from "react";
import Proptypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Card>
               <Card.Header>Director</Card.Header>
               <Card.Body>{movie.Director.Name}</Card.Body>
               <Card.Body>{movie.Director.Bio}</Card.Body>
               <Link to={`/movies/directors/:Name${movie._id}`}>
               <Button onClick={()=> { onBackClick(null); }}>exit</Button>
               </Link>
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
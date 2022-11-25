import React from "react";
import Proptypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class GenreView extends React.Component {
    render() {
        const { genre, onBackClick } = this.props

        return (
            <Card>
               <Card.Header>Genre</Card.Header>
               <Card.Body>{genre.Name}</Card.Body>
               <Card.Body>{genre.Description}</Card.Body>
               <Button onClick={()=> { onBackClick(); }}>Exit</Button>
            </Card>
        );
    };
};

GenreView.proptypes = {
    genre: Proptypes.shape({
        Name: Proptypes.string.isRequired,
        Description: Proptypes.string.isRequired,
    })
};
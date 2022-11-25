import React from "react";
import Proptypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
    render() {
        const { director, onBackClick } = this.props;

        return (
            <Card>
               <Card.Header>Director</Card.Header>
               <Card.Body>{director.Name}</Card.Body>
               <Card.Body>{director.Bio}</Card.Body>
               <Button onClick={()=> { onBackClick(null); }}>Exit</Button>
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
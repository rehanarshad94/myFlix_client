import React from 'react';
import PropTypes from "prop-types";

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
          <button onClick={() => { onBackClick(null); }}>Back</button>
       </div>
    );
  }
}
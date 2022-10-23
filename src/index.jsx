import React from "react";
import ReactDOM from "react-dom";
import { MainView } from "./components/main-view/main-view";



// import statement to indicate to bundle ./index.scss
import './index.scss';

// main componenet for now
class myFlixApplication extends React.Component {
    render() {
        return (
           <MainView />
        );
    }
}

// find the root of the app
const container = document.getElementsByClassName('app-container')[0];

// tells react to render app in root DOM element 
ReactDOM.render(React.createElement(myFlixApplication), container);




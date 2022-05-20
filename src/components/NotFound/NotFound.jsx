import React from 'react';
import "./NotFound.css"
import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className=" cloak-container">
            <h1 className="found-title">404</h1>
            <div className="cloak__wrapper">
                <div className="cloak__container">
                </div>
            </div>
            <div className="info">
                <h2>We can't find that page</h2>
                <p>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's
                    behalf.</p>
                <Link className="found-link" to="/">Home</Link>
            </div>

        </div>
    );
};

export default NotFound;
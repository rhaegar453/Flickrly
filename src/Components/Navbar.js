import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            <Link className="navbar-brand" to="/"><h2 className="heading-5">FlickrLy</h2></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse favorites" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link className="nav-item nav-link active" to="/favorites" style={{color:'white', fontWeight:'bold'}}>Favorites</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
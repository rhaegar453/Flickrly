import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import './Favorites.css';
import PropTypes from 'prop-types';
/* import Card from './Card/Card'; */
const Card = React.lazy(() => import('./Card/Card'));




let backgroundImage = "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
const Favorites = () => (
    <div style={{ backgroundImage: `url(${backgroundImage})`, width: '100%', height: '95vh', backgroundSize: 'cover' }}>
        <div className="container" style={{ height: '100%' }}>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="row" style={{ height: '100%' }}>
                    <Card title="Favorite Groups" iconClass="fa fa-object-group fa-5x" linkText="See Favorite Groups" link="/favorites/groups" />
                    <Card title="Favorite Photos" iconClass="fa fa-camera-retro fa-5x" linkText="See Favorite Photos" link="/favorites/photos" />
                </div>
            </Suspense>
        </div>
    </div>
)

export default Favorites;
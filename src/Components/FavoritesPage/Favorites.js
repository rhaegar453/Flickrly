import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import './Favorites.css';
import PropTypes from 'prop-types';
/* import Card from './Card/Card'; */
const Card = React.lazy(() => import('./Card/Card'));


const Favorites = () => (
    <div className="background">
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